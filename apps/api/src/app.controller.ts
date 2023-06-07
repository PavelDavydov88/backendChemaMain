import { Controller, Get, Inject, Param } from "@nestjs/common";
import { AppService } from './app.service';
import {ClientProxy} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(
              @Inject('AUTH_SERVICE') private readonly authService : ClientProxy,
              @Inject('PERSON_SERVICE') private readonly personService: ClientProxy,
              ) {}

  @Get()
  getPersons() {
    return this.authService.send(
        {
          cmd: 'get-user'
        },
        {}
    );
  }




}
