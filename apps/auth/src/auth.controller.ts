import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Ctx, MessagePattern, RmqContext} from "@nestjs/microservices";
import {SharedService} from "@app/shared/services/shared/shared.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly sharedService: SharedService) {}


}
