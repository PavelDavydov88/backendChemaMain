import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {CreateRoleDto} from "./dto/user-role.dto";
import {RolesService} from "./role/role.service";


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly sharedService: SharedService,
              private readonly roleService: RolesService
              ) {}

  @MessagePattern('register')
  async register(@Ctx() context: RmqContext, @Payload() dto: CreateProfileDto){
    await this.sharedService.acknowledgeMessage(context)
    return await this.authService.registration(dto)
  }

  @MessagePattern('login')
  async login(@Ctx() context: RmqContext, @Payload() dto: CreateProfileDto){
    await this.sharedService.acknowledgeMessage(context)

    return await this.authService.login(dto)
  }

  @MessagePattern('createRole')
  async createRole(@Ctx() context: RmqContext, @Payload() dto: CreateRoleDto){
    return await this.roleService.createRole(dto)
  }
}
