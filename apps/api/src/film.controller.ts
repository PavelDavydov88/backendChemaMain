import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { FilterFilmDto } from "../../film/src/dto/filterFilm.dto";

// interface FilmDTO {
//   readonly genre : string;
//   readonly country : string;
//   readonly ratingMin : number;
//   readonly ratingMax : number;
//   readonly limit : number;
//   readonly offset : number;
//
// }
@Controller("film")
export class FilmController {
  constructor(@Inject("FILM_SERVICE") private readonly filmService: ClientProxy) {
  }

  // @Get('/:id')
  // async getFilmById(@Param("id") id: number){
  //     console.log('id = ' + id);
  //     return  this.filmService.send(
  //       {
  //           cmd: 'get-film'
  //       },
  //       id
  //     );
  // }

  @Get()
  async getFilms(@Query() filterFilmDto: FilterFilmDto) {
    console.log('filterFilmDto = ' + filterFilmDto.genre);
    console.log('filterFilmDto = ' + filterFilmDto.country);
    console.log('filterFilmDto = ' + filterFilmDto.ratingMin);
    console.log('filterFilmDto = ' + filterFilmDto.ratingMax);
    console.log('filterFilmDto = ' + filterFilmDto.limit);
    console.log('filterFilmDto = ' + filterFilmDto.offset);
    return await this.filmService.send(
      {
        cmd: "get-films"
      },
      filterFilmDto
    );
  }
}