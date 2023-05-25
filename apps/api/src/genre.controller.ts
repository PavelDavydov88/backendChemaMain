import {Body, Controller, Delete, Get, Inject, Post, Put} from "@nestjs/common";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Country} from "@app/shared/models/country.model";
import {Genre} from "@app/shared/models/genre.model";

@Controller('genre')
export class GenreController {
    constructor(@Inject('GENRE_SERVICE') private readonly genreService: ClientProxy) {}

    @ApiOperation({ summary: ' Получить все жанры ' })
    @ApiResponse({ status: 200, type: Genre })
    @Get()
    async getAllGenres(){
        return await this.genreService.send(
            'getAllGenres', {});
    }
    @ApiOperation({ summary: ' Создать жанр ' })
    @ApiResponse({ status: 200, type: Genre })
    @Post()
    async createGenre(@Body() payload: any){
        return await this.genreService.send(
            'createGenre',
            payload
        )
    }

    @ApiOperation({ summary: ' Обновить жанр ' })
    @ApiResponse({ status: 200, type: Genre })
    @Put()
    async updataGenre(@Body() payload: any){
        return await this.genreService.send(
            'updateGenre',
            payload
        )
    }

    @ApiOperation({ summary: ' Удалить жанр ' })
    @ApiResponse({ status: 200, type: Genre })
    @Delete()
    async deleteGenre(@Body() payload: any){
        return await this.genreService.send(
            'deleteGenre',
            payload
        )
    }
}
