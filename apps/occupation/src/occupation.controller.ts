import { Controller, Get } from '@nestjs/common';
import { OccupationService } from './occupation.service';

@Controller()
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  @Get()
  getHello(): string {
    return this.occupationService.getHello();
  }
}
