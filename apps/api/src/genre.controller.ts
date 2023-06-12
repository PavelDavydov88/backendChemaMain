import { Body, Controller, Delete, Get, Inject, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Genre } from "@app/shared/models/genre.model";
import { JwtAuthGuard } from "../../auth/src/jwt-auth.guard";
import { Roles } from "@app/shared/decorators/role-auth.decorator";
import { catchError, throwError } from "rxjs";

@Controller('genre')
export class GenreController {
    constructor(@Inject('GENRE_SERVICE') private readonly genreService: ClientProxy) {}

    @ApiOperation({ summary: ' Получить все жанры ', tags: ['genre'] })
    @ApiResponse({ status: 200, type: Genre })
    @Get()
    async getAllGenres(){
        return  this.genreService.send(
            'getAllGenres', {});
    }
    @ApiOperation({ summary: ' Создать жанр ', tags: ['genre'] })
    @ApiResponse({ status: 200, type: Genre })
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @Post()
    async createGenre(@Body() payload: any){
        return  this.genreService.send(
            'createGenre',
            payload
        ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }

    @ApiOperation({ summary: ' Обновить жанр ', tags: ['genre'] })
    @ApiResponse({ status: 200, type: Genre })
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @Put()
    async updataGenre(@Body() payload: any){
        return  this.genreService.send(
            'updateGenre',
            payload
        ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }

    @ApiOperation({ summary: ' Удалить жанр ', tags: ['genre'] })
    @ApiResponse({ status: 200, type: Genre })
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @Delete()
    async deleteGenre(@Body() payload: any){
        return  this.genreService.send(
            'deleteGenre',
            payload
        ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }
}
