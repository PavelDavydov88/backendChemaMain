import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { FilterFilmDto } from "../../film/src/dto/filterFilm.dto";
import { CreatFilmDto } from "../../film/src/dto/creatFilm.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from "./app.service";
import { catchError, lastValueFrom, throwError } from "rxjs";
import { JwtAuthGuard } from "../../auth/src/jwt-auth.guard";
import { Roles } from "@app/shared/decorators/role-auth.decorator";

@Controller("film")
export class FilmController {
  constructor(
    @Inject("FILM_SERVICE") private readonly filmService: ClientProxy,
    private appService: AppService
  ) {
  }

  @Get("/hi")
  async getHi() {
    return "hello from film controller!";
  }

  @Get("/:id")
  async getFilmById(@Param("id") id: number) {
    return this.filmService.send(
      {
        cmd: "get-film"
      },
      id
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }


  @Get()
  async getFilms(@Query() filterFilmDto: FilterFilmDto) {
    return await this.filmService.send(
      {
        cmd: "get-films"
      },
      filterFilmDto
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @Get("/search/writers")
  async searchWriters(@Query('query') query: string) {
    return await this.filmService.send(
      {
        cmd: "search-writers"
      },
      query
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'USER')
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async creatFilm(@Body() creatFilmDto: CreatFilmDto, @UploadedFile() file) {

    const fileName = await this.appService.creatFile(file);
    if (!fileName) return {
      "success": false,
      "data": {
        "message": "Ошибка при обработке файла, фильм не был создан"
      }
    };
    creatFilmDto.picture_film = fileName;
    return this.filmService.send(
      {
        cmd: "creat-film"
      },
      creatFilmDto
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }


  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Put()
  async updateFilm(@Body() payload: any) {
    return this.filmService.send(
      "update-film",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Delete()
  async deleteFilm(@Body() payload: any) {
    const response = await this.filmService.send(
      "delete-film",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
    const nameFile = await lastValueFrom(response);
    console.log("name = " + JSON.stringify(nameFile));
    try {
      if (typeof nameFile == "string") {
        return await this.appService.deleteFile(nameFile);
      }
      return nameFile;
    }
    catch (e) {
      throw new HttpException("Ошибка при удалении файла", HttpStatus.BAD_REQUEST);
    }
  }

}