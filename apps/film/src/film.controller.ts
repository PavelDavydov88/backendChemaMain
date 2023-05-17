import { Controller, Get } from '@nestjs/common';
import { FilmService } from './film.service';
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @MessagePattern({cmd :'get-film'})
  async getFilmById(id : number){
    return await this.filmService.getFilmById(id);
  }

  @MessagePattern({cmd :'get-films'})
  async getFilms(payload : any){
    return await this.filmService.getFilms(payload);
  }
}
