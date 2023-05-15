import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller()
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getHello(): string {
    return this.countryService.getHello();
  }
}
