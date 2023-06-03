import { Body, Controller, Delete, Get, Inject, Post, Put } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, throwError } from "rxjs";

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

  @Post()
  async createOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "createOccupation",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @Put()
  async updateOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "updateOccupation",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @Delete()
  async deleteOccupation(@Body() payload: any) {
    return this.occupationService.send(
      "deleteOccupation",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

}