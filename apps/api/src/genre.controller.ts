import {Body, Controller, Delete, Get, Inject, Post, Put} from "@nestjs/common";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {ClientProxy} from "@nestjs/microservices";

@Controller('genre')
export class GenreController {
    constructor(@Inject('GENRE_SERVICE') private readonly genreService: ClientProxy) {}

    @Get()
    async getAllGenres(){
        return await this.genreService.send(
            'getAllGenres', {});
    }
    @Post()
    async createGenre(@Body() payload: any){
        return await this.genreService.send(
            'createGenre',
            payload
        )
    }
    @Put()
    async updataGenre(@Body() payload: any){
        return await this.genreService.send(
            'updateGenre',
            payload
        )
    }
    @Delete()
    async deleteGenre(@Body() payload: any){
        return await this.genreService.send(
            'deleteGenre',
            payload
        )
    }
}
