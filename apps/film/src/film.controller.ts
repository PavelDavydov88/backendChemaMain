import { Controller } from "@nestjs/common";
import { FilmService } from "./film.service";
import { MessagePattern } from "@nestjs/microservices";
import { FilterFilmDto } from "@app/shared/dtos/film-dto/filterFilm.dto";
import { CreatFilmDto } from "@app/shared/dtos/film-dto/creatFilm.dto";
import { UpdateFilmDto } from "@app/shared/dtos/film-dto/updateFilm.dto";
import { DeleteFilmDto } from "@app/shared/dtos/film-dto/deleteFilm.dto";

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService,
  ) {
  }

  @MessagePattern({ cmd: "get-film" })
  async getFilmById(id: number) {
    return await this.filmService.getFilmById(id);
  }

  @MessagePattern({ cmd: "get-films-filters" })
  async getFilms(filterFilmDto: FilterFilmDto) {
    return await this.filmService.getFilmsFilters(filterFilmDto);
  }

  @MessagePattern({ cmd: "get-films-all" })
  async getAllFilms() {
    return await this.filmService.getAllFilms();
  }

  @MessagePattern({ cmd: "search-writers" })
  async searchWriters(query: string) : Promise<string[]> {
    return await this.filmService.searchWriters(query);
  }

  @MessagePattern({ cmd: "creat-film" })
  async creatFilm(creatFilmDto: CreatFilmDto) {
    return await this.filmService.creatFilm(creatFilmDto);
  }

  @MessagePattern('update-film')
  async updateCountry( dto: UpdateFilmDto){
    return await this.filmService.updateFilm(dto)
  }

  @MessagePattern('delete-film')
  async deleteCountry( dto: DeleteFilmDto){
    return await this.filmService.deleteFilm(dto)
  }
}
