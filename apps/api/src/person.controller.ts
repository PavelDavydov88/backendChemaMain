import {
    Body,
    Controller,
    Delete,
    Get,
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
import {CreatePersonDto} from "../../person/src/dto/createPerson.dto";
import {FileService} from "../file/file.service";
import {map} from "rxjs";
import any = jasmine.any;
// import {JwtAuthGuard} from "../../auth/src/jwt-auth.guard";
import {Roles} from "@app/shared/decorators/role-auth.decorator";
import {JwtAuthGuard} from "../../auth/src/jwt-auth.guard";

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
    @ApiResponse({ status: 200, type: PersonOccupation })
    @Get("/:id")
    async getOnePerson(@Param("id") payload: number){
        return await this.personService.send('getOnePerson', payload)
    }

    @Post('')
    @UseInterceptors(FileInterceptor('image'))
    async createFile(@Body() payload: CreatePersonDto,@UploadedFile() image: any){
        const fileName = await this.fileService.createFile(image);
        if (!fileName) return {
            "success": false,
            "data": {
                "message": "Ошибка при обработке файла, фильм не был создан"
            }
        }
        payload.picture_person = fileName;

        const createPerson = await this.personService.send(
            "create-person",
            payload
        )
        return createPerson


    }

    @Put("/:id")
    async updatePerson(@Param("id") payload: any){
        return await this.personService.send('updatePerson', payload)
    }

    @Delete()
    async deletePerson(@Body() payload: CreatePersonDto){
        return await this.personService.send('deletePerson', payload)
    }

}