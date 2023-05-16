import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
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
    return this.personService.send(
        {
          cmd: 'get-persons'
        },
        {}
    );
  }


}
