import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Genre} from "@app/shared/models/genre.model";
import {JwtAuthGuard} from "../../../auth/src/jwt-auth.guard";
import {Roles} from "@app/shared/decorators/role-auth.decorator";
import {catchError, throwError} from "rxjs";
import {RoleGuard} from "../guard/role.guard";
import {CreateGenreDto} from "@app/shared/dtos/genre-dto/createGenre.dto";

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
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
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
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    @Put("/:id")
    async updataGenre(@Param("id") id: number, @Body() dto: CreateGenreDto){
        return  this.genreService.send(
            'updateGenre',
            {
                id: id,
                dto: dto
            }
        ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }

    @ApiOperation({ summary: ' Удалить жанр ', tags: ['genre'] })
    @ApiResponse({ status: 200, type: Genre })
    @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    @Delete("/:id")
    async deleteGenre(@Param("id") id: number){
        return  this.genreService.send(
            'deleteGenre',
            id
        ).pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }
}
