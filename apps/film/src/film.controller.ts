import { Controller } from "@nestjs/common";
import { FilmService } from "./film.service";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { FilterFilmDto } from "./dto/filterFilm.dto";
import { CreatFilmDto } from "./dto/creatFilm.dto";
import { UpdateFilmDto } from "./dto/updateFilm.dto";
import { SharedService } from "@app/shared/services/shared/shared.service";
import { UpdateOccupationDto } from "../../occupation/src/dto/updateOccupation.dto";
import { DeleteFilmDto } from "./dto/deleteFilm.dto";
import { Person } from "@app/shared/models/person.model";

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
