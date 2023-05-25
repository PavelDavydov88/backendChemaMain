import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { FilterFilmDto } from "../../film/src/dto/filterFilm.dto";
import { CreatFilmDto } from "../../film/src/dto/creatFilm.dto";

@Controller("film")
export class FilmController {
  constructor(@Inject("FILM_SERVICE") private readonly filmService: ClientProxy) {
  }

  @Get('/:id')
  async getFilmById(@Param("id") id: number) {
    console.log('id = ' + id);
    return this.filmService.send(
      {
        cmd: 'get-film'
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
  async creatFilm(@Body() сreatFilmDto: CreatFilmDto) {
    console.log('сreatFilmDto = ' + сreatFilmDto.name);
    return this.filmService.send(
      {
        cmd: 'creat-film'
      },
      сreatFilmDto
    );
  }

}