import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { catchError, lastValueFrom, throwError } from "rxjs";
import { JwtAuthGuard } from "../../auth/src/jwt-auth.guard";
import { Roles } from "@app/shared/decorators/role-auth.decorator";
import { FileService } from "./file/file.service";
import { FilterFilmDto } from "@app/shared/dtos/film-dto/filterFilm.dto";
import { CreatFilmDto } from "@app/shared/dtos/film-dto/creatFilm.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Film } from "@app/shared/models/film.model";

@Controller("film")
export class FilmController {
  constructor(
    @Inject("FILM_SERVICE") private readonly filmService: ClientProxy,
    private fileService: FileService
  ) {
  }

  @Get("/hi")
  async getHi() {
    return "hello from film controller!";
  }

  @ApiOperation({ summary: " Получить фильм по Id " })
  @ApiResponse({ status: 200, type: Film })
  @Get("/:id")
  async getFilmById(@Param("id") id: number) {
    return this.filmService.send(
      {
        cmd: "get-film"
      },
      id
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Получить все фильмы " })
  @ApiResponse({ status: 200, type: Film })
  @Get()
  async getFilms(@Query() filterFilmDto: FilterFilmDto) {
    return this.filmService.send(
      {
        cmd: "get-films"
      },
      filterFilmDto
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Получить всех режиссеров " })
  @ApiResponse({ status: 200, type: Film })
  @Get("/search/writers")
  async searchWriters(@Query("query") query: string) {
    return this.filmService.send(
      {
        cmd: "search-writers"
      },
      query
    );
  }

  @ApiOperation({ summary: " Создать новый фильм " })
  @ApiResponse({ status: 201, type: Film })
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async creatFilm(@Body() creatFilmDto: CreatFilmDto, @UploadedFile() file) {

    const fileName = await this.fileService.creatFile(file);
    if (!fileName) throw new HttpException("Ошибка при обработке файла, фильм не был создан", HttpStatus.BAD_REQUEST);
    creatFilmDto.picture_film = fileName;
    return this.filmService.send(
      {
        cmd: "creat-film"
      },
      creatFilmDto
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " обновить название фильма " })
  @ApiResponse({ status: 204, type: Number })
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @Put()
  async updateFilm(@Body() payload: any) {
    return this.filmService.send(
      "update-film",
      payload
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Удалить фильм " })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
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
        return await this.fileService.deleteFile(nameFile);
      }
      return nameFile;
    } catch (e) {
      throw new HttpException("Ошибка при удалении файла", HttpStatus.BAD_REQUEST);
    }
  }

}