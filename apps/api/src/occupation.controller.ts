import { Body, Controller, Delete, Get, Inject, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, throwError } from "rxjs";
import { JwtAuthGuard } from "../../auth/src/jwt-auth.guard";
import { Roles } from "@app/shared/decorators/role-auth.decorator";

@Controller("occupation")
export class OccupationController {
  constructor(@Inject("OCCUPATION_SERVICE") private readonly occupationService: ClientProxy) {
  }

  @Get()
  async getAllOccupation() {
    return this.occupationService.send(
      "getAllOccupation", {}
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'USER')
  @Post()
  async createOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "createOccupation",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

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
  @Delete()
  async deleteOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "deleteOccupation",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

}