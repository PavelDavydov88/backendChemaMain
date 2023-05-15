import { Controller, Get } from '@nestjs/common';
import { PersonService } from './person.service';
import {Ctx, MessagePattern, RmqContext} from "@nestjs/microservices";
import {SharedService} from "@app/shared/services/shared/shared.service";

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService,
              private readonly sharedService: SharedService
              ) {}

  @MessagePattern({ cmd: 'get-persons' })
  async getPersons(@Ctx() context: RmqContext){
    this.sharedService.acknowledgeMessage(context);

    // return this.personService.getAllPerson()

  }


}
