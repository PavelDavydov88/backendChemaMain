import {Controller} from "@nestjs/common";
import {OccupationService} from "./occupation.service";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CreateOccupationDto} from "@app/shared/dtos/occupation-dto/createOccupation.dto";
import {SharedService} from "@app/shared/services/shared/shared.service";

@Controller()
export class OccupationController {
  constructor(private readonly occupationService: OccupationService,
              private readonly sharedService: SharedService
  ) {}

  @MessagePattern('getAllOccupation')
  async getAllOccupation(@Ctx() context: RmqContext){
    await this.sharedService.acknowledgeMessage(context)
    return await this.occupationService.getAllOccupation()
  }
  @MessagePattern('createOccupation')
  async createOccupation(@Ctx() context: RmqContext,@Payload() dto: CreateOccupationDto){
    await this.sharedService.acknowledgeMessage(context)
    return await this.occupationService.createOccupation(dto)
  }
  @MessagePattern('updateOccupation')
  async updateOccupation(@Ctx() context: RmqContext,@Payload() payload: object){
    await this.sharedService.acknowledgeMessage(context)
    const dto = payload['dto']
    const id = payload['id']
    return await this.occupationService.updateOccupation(dto, id)
  }

  @MessagePattern('deleteOccupation')
  async deleteOccupation(@Ctx() context: RmqContext,@Payload() id: number){
    await this.sharedService.acknowledgeMessage(context)
    return await this.occupationService.deleteOccupation(id)
  }
}
