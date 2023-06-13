import {Controller} from '@nestjs/common';
import {CountryService} from './country.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {CreateCountryDto} from "@app/shared/dtos/country-dto/createCountry.dto";

@Controller()
export class CountryController {
  constructor(private readonly countryService: CountryService,
              private readonly sharedService: SharedService
  ) {}

  @MessagePattern('getAllCountry')
  async getAllCountry(@Ctx() context: RmqContext){
    await this.sharedService.acknowledgeMessage(context)
    return await this.countryService.getAllCountry()
  }
  @MessagePattern('createCountry')
  async createCountry(@Ctx() context: RmqContext, @Payload() dto: CreateCountryDto){
    await this.sharedService.acknowledgeMessage(context)
    return await this.countryService.createCountry(dto)
  }
  @MessagePattern('updateCountry')
  async updateCountry(@Ctx() context: RmqContext, @Payload() payload: object){
    await this.sharedService.acknowledgeMessage(context)
    const dto = payload['dto']
    const id = payload['id']
    return await this.countryService.updateCountry(id, dto)
  }

  @MessagePattern('deleteCountry')
  async deleteCountry(@Ctx() context: RmqContext, @Payload() id: number){
    await this.sharedService.acknowledgeMessage(context)
    return await this.countryService.deleteCountry(id)
  }
}
