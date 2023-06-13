import {Controller} from '@nestjs/common';
import {GenreService} from './genre.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {CreateGenreDto} from "@app/shared/dtos/genre-dto/createGenre.dto";

@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService,
              private readonly sharedService: SharedService
  ) {}

  @MessagePattern("getAllGenres")
  async getAllGenres(@Ctx() context: RmqContext){
    await this.sharedService.acknowledgeMessage(context)
    return await this.genreService.getAllGenres()
  }

  @MessagePattern("createGenre")
  async createGenre(@Ctx() context: RmqContext, @Payload() dto: CreateGenreDto ){
    await this.sharedService.acknowledgeMessage(context)
    return await this.genreService.createGenre(dto)
  }

  @MessagePattern("updateGenre")
  async updateGenre(@Ctx() context: RmqContext, @Payload() payload: object){
    await this.sharedService.acknowledgeMessage(context)
    const dto = payload['dto']
    const id = payload['id']
    return await this.genreService.updateGenre(id, dto)
  }
  @MessagePattern("deleteGenre")
  async deleteGenre(@Ctx() context: RmqContext, @Payload() id: number){
    await this.sharedService.acknowledgeMessage(context)
    return await this.genreService.deleteGenre(id)
  }
}
