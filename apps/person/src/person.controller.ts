import { Controller } from "@nestjs/common";
import { PersonService } from "./person.service";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { SharedService } from "@app/shared/services/shared/shared.service";
import { CreatePersonDto } from "@app/shared/dtos/person-dto/createPerson.dto";
import { DeletePersonDto } from "@app/shared/dtos/person-dto/deletePerson.dto";
import {UpdatePersonDto} from "@app/shared/dtos/person-dto/updatePerson.dto";

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService,
              private readonly sharedService: SharedService
  ) {
  }

  @MessagePattern({ cmd: "get-persons" })
  async getPersons(@Ctx() context: RmqContext) {
    await this.sharedService.acknowledgeMessage(context);

    return this.personService.getAllPerson();

  }

  @MessagePattern("getOnePerson")
  async getOnePerson(@Ctx() context: RmqContext, @Payload() id: number) {
    await this.sharedService.acknowledgeMessage(context);

    return await this.personService.getByValue(id);
  }

  @MessagePattern("create-person")
  async createPerson(@Ctx() context: RmqContext, @Payload() dto: CreatePersonDto) {
    await this.sharedService.acknowledgeMessage(context);

    return await this.personService.createPerson(dto);
  }

  @MessagePattern("updatePerson")
  async updatePerson(@Ctx() context: RmqContext, @Payload() dto: UpdatePersonDto) {
    await this.sharedService.acknowledgeMessage(context);

    return await this.personService.updatePerson(dto);
  }

  @MessagePattern("deletePerson")
  async deletePerson(@Ctx() context: RmqContext, @Payload() id: number) {
    await this.sharedService.acknowledgeMessage(context);

    return await this.personService.deletePerson(id);

  }


}
