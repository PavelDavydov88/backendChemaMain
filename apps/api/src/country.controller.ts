import { Body, Controller, Delete, Get, Inject, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Country } from "@app/shared/models/country.model";
import { catchError, throwError } from "rxjs";
import { JwtAuthGuard } from "../../auth/src/jwt-auth.guard";
import { Roles } from "@app/shared/decorators/role-auth.decorator";

@Controller("country")
export class CountryController {
  constructor(@Inject("COUNTRY_SERVICE") private readonly countryService: ClientProxy) {
  }

  @ApiOperation({ summary: " Получить все страны ", tags: ['country'] })
  @ApiResponse({ status: 200, type: [Country] })
  @Get()
  async getAllCountry() {
    return this.countryService.send(
      "getAllCountry", {}
    );
  }

  @ApiOperation({ summary: " Создать страну ", tags: ['occupation'] })
  @ApiResponse({ status: 200, type: Country })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Post()
  async createCountry(@Body() payload: any) {
    return this.countryService.send(
      "createCountry",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Обновить страну ", tags: ['occupation'] })
  @ApiResponse({ status: 200, type: Country })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Put()
  async updateCountry(@Body() payload: any) {
    return this.countryService.send(
      "updateCountry",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Удалить страну ", tags: ['occupation'] })
  @ApiResponse({ status: 200, type: Country })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Delete()
  async deleteCountry(@Body() payload: any) {
    return this.countryService.send(
      "deleteCountry",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }
}