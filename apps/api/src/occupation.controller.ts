import { Body, Controller, Delete, Get, Inject, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Person} from "@app/shared/models/person.model";
import {Occupation} from "@app/shared/models/occupation.model";

@Controller('occupation')
export class OccupationController {
  constructor(@Inject("OCCUPATION_SERVICE") private readonly occupationService: ClientProxy) {
  }

  @ApiOperation({ summary: ' Получить список всех профессий ' })
  @ApiResponse({ status: 200, type: Occupation })
  @Get()
  async getAllOccupation() {
    return this.occupationService.send(
      "getAllOccupation", {}
    );
  }

  @ApiOperation({ summary: ' Создать новую профессию ' })
  @ApiResponse({ status: 201, type: Occupation })
  @Post()
  async createOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "createOccupation",
      payload
    );
  }

  @ApiOperation({ summary: ' Обновить существующую профессию ' })
  @ApiResponse({ status: 204, type: Occupation })
  @Put()
  async updateOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "updateOccupation",
      payload
    );
  }

  @ApiOperation({ summary: ' удалить профессию ' })
  @ApiResponse({ status: 200, type: Occupation })
  @Delete()
  async deleteOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "deleteOccupation",
      payload
    );
  }

}