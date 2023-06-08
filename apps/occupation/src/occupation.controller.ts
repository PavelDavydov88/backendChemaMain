import { Controller } from "@nestjs/common";
import { OccupationService } from "./occupation.service";
import { MessagePattern } from "@nestjs/microservices";
import { DeleteOccupationDto } from "@app/shared/dtos/occupation-dto/deleteOccupation.dto";
import { CreateOccupationDto } from "@app/shared/dtos/occupation-dto/createOccupation.dto";
import { UpdateOccupationDto } from "@app/shared/dtos/occupation-dto/updateOccupation.dto";

@Controller()
export class OccupationController {
  constructor(private readonly occupationService: OccupationService,
  ) {}

  @MessagePattern('getAllOccupation')
  async getAllOccupation(){
    return await this.occupationService.getAllOccupation()
  }
  @MessagePattern('createOccupation')
  async createOccupation( dto: CreateOccupationDto){
    return await this.occupationService.createOccupation(dto)
  }
  @MessagePattern('updateOccupation')
  async updateOccupation( dto: UpdateOccupationDto){
    return await this.occupationService.updateOccupation(dto)
  }

  @MessagePattern('deleteOccupation')
  async deleteOccupation( dto: DeleteOccupationDto){
    return await this.occupationService.deleteOccupation(dto)
  }
}
