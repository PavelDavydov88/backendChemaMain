import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import {ClientProxy, Payload} from "@nestjs/microservices";

interface FilmDTO {
  readonly genre : string;
  readonly country : string;
}
@Controller('film')
export class FilmController{
    constructor(@Inject('FILM_SERVICE') private readonly filmService: ClientProxy ) {}

    @Get('/:id')
    async getFilmById(@Param("id") id: number){
        console.log('id = ' + id);
        return  this.filmService.send(
          {
              cmd: 'get-film'
          },
          id
        );
    }

  @Get()
  async getFilms(@Param("country") payload: string) {
    console.log('payload = ' + payload);
    return  this.filmService.send(
      {
        cmd: 'get-films'
      },
      // payload
      {}
    );
  }
}