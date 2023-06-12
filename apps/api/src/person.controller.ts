import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Person} from "@app/shared/models/person.model";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreatePersonDto} from "@app/shared/dtos/person-dto/createPerson.dto";
import {Roles} from "@app/shared/decorators/role-auth.decorator";
import {JwtAuthGuard} from "../../auth/src/jwt-auth.guard";
import {FileService} from "./file/file.service";
import {catchError, throwError} from "rxjs";
import {UpdatePersonDto} from "@app/shared/dtos/person-dto/updatePerson.dto";

@Controller("person")
export class PersonController {
  constructor(@Inject("PERSON_SERVICE") private personService: ClientProxy,
              private readonly fileService: FileService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @Get("/good")
  async getInfo() {
    return {
      message: "completed"
    };
  }

  @ApiOperation({ summary: " Получить всех работников кино " })
  @ApiResponse({ status: 200, type: Person })
  @Get()
  async getPersons() {
    return  this.personService.send(
      {
        cmd: "get-persons"
      },
      {}
    );
  }

  @ApiOperation({ summary: " Получить одного работника кино, включая смежные с ним бд " })
  @ApiResponse({ status: 200, type: Person })
  @Get("/:id")
  async getOnePerson(@Param("id") payload: number) {
    return this.personService.send("getOnePerson", payload)
        .pipe(catchError(error => throwError(() => new RpcException(error.response))));;
  }

  @ApiOperation({ summary: " Создать нового работника сферы кино " })
  @ApiResponse({ status: 201, type: Person })
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @Post("")
  @UseInterceptors(FileInterceptor("image"))
  async createPerson(@Body() payload: CreatePersonDto, @UploadedFile() image: any) {
    let fileName = await this.fileService.creatFile(image);
    if(fileName) payload.picture_person = fileName
    else payload.picture_person = ' '
    return this.personService.send(
      "create-person",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " обновить существующего работника кино " })
  @ApiResponse({ status: 204, type: Number})
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @Put()
  async updatePerson( payload: UpdatePersonDto) {
    return this.personService.send("updatePerson", payload)
      .pipe(catchError(error => throwError(
        () => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Удалить работника кино " })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @Delete("/:id")
  async deletePerson(@Param("id") payload: number) {
    return this.personService.send("deletePerson", payload)
      .pipe(catchError(error => throwError(
        () => new RpcException(error.response))));
  }

}