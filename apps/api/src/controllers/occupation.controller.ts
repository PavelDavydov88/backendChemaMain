import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {catchError, throwError} from "rxjs";
import {JwtAuthGuard} from "../../../auth/src/jwt-auth.guard";
import {Roles} from "@app/shared/decorators/role-auth.decorator";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Occupation} from "@app/shared/models/occupation.model";
import {RoleGuard} from "../guard/role.guard";
import {CreateOccupationDto} from "@app/shared/dtos/occupation-dto/createOccupation.dto";

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
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
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
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @Put('/:id')
  async updateOccupation(@Param('id') id: number, @Body() dto: CreateOccupationDto) {
    return this.occupationService.send(
      "updateOccupation",
        {
          id: id,
          dto: dto
        }
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }


  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: ' Удалить профессию ', tags: ['occupation'] })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @Delete('/:id')
  async deleteOccupation(@Param('id') id: number) {
    return this.occupationService.send(
      "deleteOccupation",
      id
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

}