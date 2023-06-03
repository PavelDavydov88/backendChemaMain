import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { FilterFilmDto } from "../../film/src/dto/filterFilm.dto";
import { CreatFilmDto } from "../../film/src/dto/creatFilm.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from "./app.service";
import { catchError, lastValueFrom, throwError } from "rxjs";

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

  @Put()
  async updateFilm(@Body() payload: any) {
    return this.filmService.send(
      "update-film",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

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
      return "Ошибка при удалении файла"
    }
  }

}