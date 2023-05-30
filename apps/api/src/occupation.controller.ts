import { Body, Controller, Delete, Get, Inject, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('occupation')
export class OccupationController {
  constructor(@Inject("OCCUPATION_SERVICE") private readonly occupationService: ClientProxy) {
  }

  @Get()
  async getAllOccupation() {
    return this.occupationService.send(
      "getAllOccupation", {}
    );
  }

  @Post()
  async createOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "createOccupation",
      payload
    );
  }

  @Put()
  async updateOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "updateOccupation",
      payload
    );
  }

  @Delete()
  async deleteOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "deleteOccupation",
      payload
    );
  }

}