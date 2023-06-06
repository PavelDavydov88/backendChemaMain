import { Controller } from "@nestjs/common";
import { FilmService } from "./film.service";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { FilterFilmDto } from "@app/shared/dtos/film-dto/filterFilm.dto";
import { CreatFilmDto } from "@app/shared/dtos/film-dto/creatFilm.dto";
import { UpdateFilmDto } from "@app/shared/dtos/film-dto/updateFilm.dto";
import { SharedService } from "@app/shared/services/shared/shared.service";
import { UpdateOccupationDto } from "@app/shared/dtos/occupation-dto/updateOccupation.dto";
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

  @MessagePattern({ cmd: "get-films" })
  async getFilms(filterFilmDto: FilterFilmDto) {
    return await this.filmService.getFilms(filterFilmDto);
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
