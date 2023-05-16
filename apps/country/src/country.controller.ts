import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {CreateCountryDto} from "./dto/createCountry.dto";
import {UpdateCountryDto} from "./dto/updateCountry.dto";

@Controller()
export class CountryController {
  constructor(private readonly countryService: CountryService,
              private readonly sharedService: SharedService
  ) {}

  @MessagePattern('getAllCountry')
  async getAllCountry(@Ctx() context: RmqContext){
    await this.sharedService.acknowledgeMessage(context)
    return await this.countryService.getAllCounbtry()
  }
  @MessagePattern('createCountry')
  async createCountry(@Ctx() context: RmqContext, @Payload() dto: CreateCountryDto){
    await this.sharedService.acknowledgeMessage(context)
    return await this.countryService.createCountry(dto)
  }
  @MessagePattern('updateCountry')
  async updateCountry(@Ctx() context: RmqContext, @Payload() dto: UpdateCountryDto){
    await this.sharedService.acknowledgeMessage(context)
    return await this.countryService.updateCountry(dto)
  }

  @MessagePattern('deleteCountry')
  async deleteCountry(@Ctx() context: RmqContext, @Payload() dto: CreateCountryDto){
    await this.sharedService.acknowledgeMessage(context)
    return await this.countryService.deleteCountry(dto)
  }
}
