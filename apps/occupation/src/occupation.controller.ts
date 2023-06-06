import { Controller } from "@nestjs/common";
import { OccupationService } from "./occupation.service";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { SharedService } from "@app/shared/services/shared/shared.service";
import { CreateOccupationDto } from "@app/shared/dtos/occupation-dto/createOccupation.dto";
import { UpdateOccupationDto } from "@app/shared/dtos/occupation-dto/updateOccupation.dto";

@Controller()
export class OccupationController {
  constructor(private readonly occupationService: OccupationService,
              private readonly sharedService: SharedService
  ) {}

  @MessagePattern('getAllOccupation')
  async getAllCountry(@Ctx() context: RmqContext){
    await this.sharedService.acknowledgeMessage(context)
    return await this.occupationService.getAllOccupation()
  }
  @MessagePattern('createOccupation')
  async createCountry(@Ctx() context: RmqContext, @Payload() dto: CreateOccupationDto){
    await this.sharedService.acknowledgeMessage(context)
    return await this.occupationService.createOccupation(dto)
  }
  @MessagePattern('updateOccupation')
  async updateCountry(@Ctx() context: RmqContext, @Payload() dto: UpdateOccupationDto){
    await this.sharedService.acknowledgeMessage(context)
    return await this.occupationService.updateOccupation(dto)
  }

  @MessagePattern('deleteOccupation')
  async deleteCountry(@Ctx() context: RmqContext, @Payload() dto: CreateOccupationDto){
    await this.sharedService.acknowledgeMessage(context)
    return await this.occupationService.deleteOccupation(dto)
  }
}
