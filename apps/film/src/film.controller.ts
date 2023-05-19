import { Controller } from "@nestjs/common";
import { FilmService } from "./film.service";
import { MessagePattern } from "@nestjs/microservices";
import { FilterFilmDto } from "./dto/filterFilm.dto";

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @MessagePattern({cmd :'get-film'})
  async getFilmById(id : number){
    return await this.filmService.getFilmById(id);
  }

  @MessagePattern({cmd :'get-films'})
  async getFilms(filterFilmDto : FilterFilmDto){
    console.log('genre = ' + filterFilmDto.genre);
    console.log('country = ' + filterFilmDto.country);
    console.log('ratingMin = ' + filterFilmDto.ratingMin);
    console.log('ratingMax = ' + filterFilmDto.ratingMax);
    console.log('limit = ' + filterFilmDto.limit);
    console.log('offset = ' + filterFilmDto.offset);
    return await this.filmService.getFilms(filterFilmDto);
  }
}
