import { Controller, Get } from '@nestjs/common';
import { PersonService } from './person.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {CreatePersonDto} from "./dto/createPerson.dto";

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService,
              private readonly sharedService: SharedService
              ) {}

  @MessagePattern({ cmd: 'get-persons' })
  async getPersons(@Ctx() context: RmqContext){
    await this.sharedService.acknowledgeMessage(context);

    return this.personService.getAllPerson()

  }
  @MessagePattern('getOnePerson')
  async getOnePerson(@Ctx() context: RmqContext, @Payload() dto: CreatePersonDto){
    await this.sharedService.acknowledgeMessage(context)

    return await this.personService.getByValue(dto)
  }

}
