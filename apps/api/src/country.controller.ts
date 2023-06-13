import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Country } from "@app/shared/models/country.model";
import { catchError, throwError } from "rxjs";
import { JwtAuthGuard } from "../../auth/src/jwt-auth.guard";
import { Roles } from "@app/shared/decorators/role-auth.decorator";
import {CreateCountryDto} from "@app/shared/dtos/country-dto/createCountry.dto";
import {UpdateCountryDto} from "@app/shared/dtos/country-dto/updateCountry.dto";

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

  @ApiOperation({ summary: " Создать страну ", tags: ['country'] })
  @ApiResponse({ status: 200, type: Country })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Post()
  async createCountry(@Body() payload: CreateCountryDto) {
    return this.countryService.send(
      "createCountry",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Обновить страну ", tags: ['country'] })
  @ApiResponse({ status: 200, type: Country })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Put()
  async updateCountry(@Body() payload: UpdateCountryDto) {
    return this.countryService.send(
      "updateCountry",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Удалить страну ", tags: ['country'] })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')

  @Delete("/:id")
  async deleteCountry(@Param("id")payload: number) {
    return this.countryService.send(
      "deleteCountry",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }
}