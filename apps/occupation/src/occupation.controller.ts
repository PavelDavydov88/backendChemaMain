import { Controller } from "@nestjs/common";
import { OccupationService } from "./occupation.service";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { SharedService } from "@app/shared/services/shared/shared.service";
import { CreateOccupationDto } from "./dto/createOccupation.dto";
import { UpdateOccupationDto } from "./dto/updateOccupation.dto";
import { DeleteOccupationDto } from "./dto/deleteOccupation.dto";

@Controller()
export class OccupationController {
  constructor(private readonly occupationService: OccupationService,
  ) {}

  @MessagePattern('getAllOccupation')
  async getAllCountry(){
    return await this.occupationService.getAllOccupation()
  }
  @MessagePattern('createOccupation')
  async createCountry( dto: CreateOccupationDto){
    return await this.occupationService.createOccupation(dto)
  }
  @MessagePattern('updateOccupation')
  async updateCountry( dto: UpdateOccupationDto){
    return await this.occupationService.updateOccupation(dto)
  }

  @MessagePattern('deleteOccupation')
  async deleteCountry( dto: DeleteOccupationDto){
    return await this.occupationService.deleteOccupation(dto)
  }
}
