import { Controller } from "@nestjs/common";
import { FilmService } from "./film.service";
import { MessagePattern } from "@nestjs/microservices";
import { FilterFilmDto } from "./dto/filterFilm.dto";
import { CreatFilmDto } from "./dto/creatFilm.dto";

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @MessagePattern({cmd :'get-film'})
  async getFilmById(id : number){
    return await this.filmService.getFilmById(id);
  }

  @MessagePattern({cmd :'get-films'})
  async getFilms(filterFilmDto : FilterFilmDto){
    return await this.filmService.getFilms(filterFilmDto);
  }

  @MessagePattern({cmd :'creat-film'})
  async creatFilm(creatFilmDto : CreatFilmDto){
    return await this.filmService.creatFilm(creatFilmDto);
  }

}
