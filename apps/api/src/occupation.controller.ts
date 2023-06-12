import { Body, Controller, Delete, Get, Inject, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, throwError } from "rxjs";
import { JwtAuthGuard } from "../../auth/src/jwt-auth.guard";
import { Roles } from "@app/shared/decorators/role-auth.decorator";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Occupation } from "@app/shared/models/occupation.model";
import { isNumber } from "@nestjs/common/utils/shared.utils";

@Controller("occupation")
export class OccupationController {
  constructor(@Inject("OCCUPATION_SERVICE") private readonly occupationService: ClientProxy) {
  }

  @ApiOperation({ summary: ' Получить список всех профессий ', tags: ['occupation'] })
  @ApiResponse({ status: 200, type: Occupation })
  @Get()
  async getAllOccupation() {
    return this.occupationService.send(
      "getAllOccupation", {}
    );
  }

  @ApiOperation({ summary: ' Создать новую профессию ', tags: ['occupation'] })
  @ApiResponse({ status: 201, type: Occupation })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'USER')
  @Post()
  async createOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "createOccupation",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: ' Обновить существующую профессию ', tags: ['occupation'] })
  @ApiResponse({ status: 204, type: Number })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Put()
  async updateOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "updateOccupation",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }


  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: ' Удалить профессию ', tags: ['occupation'] })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Delete()
  async deleteOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "deleteOccupation",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

}