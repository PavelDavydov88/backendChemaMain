import {
    Body,
    Controller,
    Delete,
    Get, HttpException, HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    Req,
    UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Genre} from "@app/shared/models/genre.model";
import {Person} from "@app/shared/models/person.model";
import {PersonOccupation} from "@app/shared/models/person_occupation.model";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreatePersonDto} from "@app/shared/dtos/person-dto/createPerson.dto";
import {FileService} from "./file/file.service";
import {map} from "rxjs";
import any = jasmine.any;
// import {JwtAuthGuard} from "../../auth/src/jwt-auth.guard";
import {Roles} from "@app/shared/decorators/role-auth.decorator";
import {JwtAuthGuard} from "../../auth/src/jwt-auth.guard";
import {RoleGuard} from "./guard/role.guard";
import {PersonBestFilm} from "@app/shared/models/person_best_film.model";
import {PersonGenre} from "@app/shared/models/person_genre.model";
import {PersonCountry} from "@app/shared/models/person_counrty.model";

@Controller('person')
export class PersonController{
    constructor(@Inject('PERSON_SERVICE') private personService: ClientProxy,
                private readonly fileService: FileService,

                ) {}
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @Get('/good')
    async getInfo(){
        return {
            message: 'completed'
        }
    }

    @ApiOperation({ summary: ' Получить всех работников кино ' })
    @ApiResponse({ status: 200, type: Person })
    @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    @Get()
    async getPersons() {
        const person = await this.personService.send(
            {
                cmd: 'get-persons'
            },
            {}
        );

        return person
    }
    @ApiOperation({ summary: ' Получить одного работника кино, включая смежные с ним бд ' })
    @ApiResponse({ status: 200, type: Person })
    @UseGuards(JwtAuthGuard)
    @Roles('USER')
    @Get("/:id")
    async getOnePerson(@Param("id") payload: number){
        return await this.personService.send('getOnePerson', payload)
    }

    @ApiOperation({ summary: ' Создать нового работника сферы кино ' })
    @ApiResponse({ status: 201, type: Person })
    @Post('')
    @UseInterceptors(FileInterceptor('image'))
    async createPerson(@Body() payload: CreatePersonDto,@UploadedFile() image: any){
        const fileName = await this.fileService.createFile(image);
        if (!fileName) {
            throw new HttpException('ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        payload.picture_person = fileName;

        const createPerson = await this.personService.send(
            "create-person",
            payload
        )
        return createPerson


    }

    @ApiOperation({ summary: ' обновить существующего работника кино ' })
    @ApiResponse({ status: 204, type: Person })
    @Put("/:id")
    async updatePerson(@Param("id") payload: any){
        return await this.personService.send('updatePerson', payload)
    }

    @ApiOperation({ summary: ' Удалить работника кино ' })
    @ApiResponse({ status: 200, type: Person })
    @Delete()
    async deletePerson(@Body() payload: CreatePersonDto){
        return await this.personService.send('deletePerson', payload)
    }

}