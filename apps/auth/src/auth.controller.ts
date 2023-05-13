import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Ctx, MessagePattern, RmqContext} from "@nestjs/microservices";
import {SharedService} from "@app/shared/services/shared/shared.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly sharedService: SharedService) {}

  @MessagePattern({ cmd: 'get-user' })
  async getPersons(@Ctx() context: RmqContext){
    // this.sharedService.acknowledgeMessage(context);

    return this.authService.getAllPerson()

  }
}
