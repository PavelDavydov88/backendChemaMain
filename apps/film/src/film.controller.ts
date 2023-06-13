import {Controller} from "@nestjs/common";
import {FilmService} from "./film.service";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {FilterFilmDto} from "@app/shared/dtos/film-dto/filterFilm.dto";
import {CreatFilmDto} from "@app/shared/dtos/film-dto/creatFilm.dto";
import {SharedService} from "@app/shared/services/shared/shared.service";

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService,
              private readonly sharedService: SharedService
  ) {
  }

  @MessagePattern({ cmd: "get-film" })
  async getFilmById(@Ctx() context : RmqContext,@Payload() id: number) {
    await this.sharedService.acknowledgeMessage(context)
    return await this.filmService.getFilmById(id);
  }

  @MessagePattern({ cmd: "get-films-filters" })
  async getFilms(@Ctx() context : RmqContext,@Payload() filterFilmDto: FilterFilmDto) {
    await this.sharedService.acknowledgeMessage(context)
    return await this.filmService.getFilmsFilters(filterFilmDto);
  }

  @MessagePattern({ cmd: "get-films-all" })
  async getAllFilms(@Ctx() context : RmqContext) {
    await this.sharedService.acknowledgeMessage(context)
    return await this.filmService.getAllFilms();
  }

  @MessagePattern({ cmd: "search-writers" })
  async searchWriters(@Ctx() context : RmqContext,@Payload() query: string) : Promise<string[]> {
    await this.sharedService.acknowledgeMessage(context)
    return await this.filmService.searchWriters(query);
  }

  @MessagePattern({ cmd: "creat-film" })
  async creatFilm(@Ctx() context : RmqContext,@Payload() creatFilmDto: CreatFilmDto) {
    await this.sharedService.acknowledgeMessage(context)
    return await this.filmService.creatFilm(creatFilmDto);
  }

  @MessagePattern('update-film')
  async updateCountry(@Ctx() context : RmqContext,@Payload()  payload: object){
    await this.sharedService.acknowledgeMessage(context)
    const dto = payload['dto']
    const id = payload['id']
    return await this.filmService.updateFilm(id, dto)
  }

  @MessagePattern('delete-film')
  async deleteCountry(@Ctx() context : RmqContext, @Payload() id: number ){
    await this.sharedService.acknowledgeMessage(context)
    return await this.filmService.deleteFilm(id)
  }
}
