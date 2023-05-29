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
import { ClientProxy } from "@nestjs/microservices";
import { FilterFilmDto } from "../../film/src/dto/filterFilm.dto";
import { CreatFilmDto } from "../../film/src/dto/creatFilm.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from "./app.service";
import { Observable } from "rxjs";

@Controller("film")
export class FilmController {
  constructor(
    @Inject("FILM_SERVICE") private readonly filmService: ClientProxy,
    private appService: AppService
  ) {
  }

  @Get("/hi")
  async getHi() {
    return "hello from film!";
  }

  @Get("/:id")
  async getFilmById(@Param("id") id: number) {
    console.log("id = " + id);
    return this.filmService.send(
      {
        cmd: "get-film"
      },
      id
    );
  }

  @Get()
  async getFilms(@Query() filterFilmDto: FilterFilmDto) {
    return await this.filmService.send(
      {
        cmd: "get-films"
      },
      filterFilmDto
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
    console.log("creatFilmDto=" + creatFilmDto.name);
    const creatFilm = await this.filmService.send(
      {
        cmd: "creat-film"
      },
      creatFilmDto
    );
    return creatFilm;
  }

  @Put()
  async updateFilm(@Body() payload: any) {
    return this.filmService.send(
      "update-film",
      payload
    );
  }

  @Delete()
  async deleteFilm(@Body() payload: any) {
    const response = await this.filmService.send(
      "delete-film",
      payload
    );
    try {
      const name = await response.subscribe(a => a.toJSON())
      console.log('name = ' + name);
      // await this.appService.deleteFile(response);
    }
    catch (e){
      console.log(e);
    }


    return response;
  }

}