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
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {FileInterceptor} from "@nestjs/platform-express";
import {catchError, lastValueFrom, throwError} from "rxjs";
import {JwtAuthGuard} from "../../../auth/src/jwt-auth.guard";
import {Roles} from "@app/shared/decorators/role-auth.decorator";
import {FileService} from "../file/file.service";
import {FilterFilmDto} from "@app/shared/dtos/film-dto/filterFilm.dto";
import {CreatFilmDto} from "@app/shared/dtos/film-dto/creatFilm.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Film} from "@app/shared/models/film.model";
import {RoleGuard} from "../guard/role.guard";

@Controller("film")
export class FilmController {
  constructor(
    @Inject("FILM_SERVICE") private readonly filmService: ClientProxy,
    private fileService: FileService
  ) {
  }



  @ApiOperation({ summary: " Получить все фильмы ", tags: ['film']  })
  @ApiResponse({ status: 200, type: Film })
  @Get("/all")
  async getFilmAllFilms() {
    return this.filmService.send(
      {
        cmd: "get-films-all"
      },
      {}
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Получить фильм по Id ", tags: ['film']  })
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

  @ApiOperation({ summary: " Получить все фильмы по фильтру", tags: ['film']  })
  @ApiResponse({ status: 200, type: Film })
  @Get()
  async getFilms(@Query() filterFilmDto: FilterFilmDto) {
    return this.filmService.send(
      {
        cmd: "get-films-filters"
      },
      filterFilmDto
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Получить всех режиссеров ", tags: ['film']  })
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

  @ApiOperation({ summary: " Создать новый фильм ", tags: ['film']  })
  @ApiResponse({ status: 201, type: Film })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async creatFilm(@Body() creatFilmDto: CreatFilmDto, @UploadedFile() file) {

    const fileName = await this.fileService.creatFile(file);
     if (!fileName) {creatFilmDto.picture_film = null;} else {creatFilmDto.picture_film = fileName;}

    return this.filmService.send(
      {
        cmd: "creat-film"
      },
      creatFilmDto
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " обновить название фильма ", tags: ['film']  })
  @ApiResponse({ status: 204, type: Number })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @Put("/:id")
  async updateFilm(@Param("id") id: number, @Body() dto: CreatFilmDto) {
    return this.filmService.send(
      "update-film",
        {
          id: id,
          dto: dto
        }
    ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @ApiOperation({ summary: " Удалить фильм ", tags: ['film'] })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @Delete("/:id")
  async deleteFilm(@Param("id") id: number) {
    const response = await this.filmService.send(
      "delete-film",
      id
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