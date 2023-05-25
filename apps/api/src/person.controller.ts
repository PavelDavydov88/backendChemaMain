import {Body, Controller, Get, Inject, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Genre} from "@app/shared/models/genre.model";
import {Person} from "@app/shared/models/person.model";
import {PersonOccupation} from "@app/shared/models/person_occupation.model";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('person')
export class PersonController{
    constructor(@Inject('PERSON_SERVICE') private personService: ClientProxy,
                @Inject('FILE_SERVICE') private fileService: ClientProxy
                ) {}
    @ApiOperation({ summary: ' Получить всех работников кино ' })
    @ApiResponse({ status: 200, type: Person })
    @Get()
    getPersons() {
        return this.personService.send(
            {
                cmd: 'get-persons'
            },
            {}
        );
    }
    @ApiOperation({ summary: ' Получить одного работника кино, включая смежные с ним бд ' })
    @ApiResponse({ status: 200, type: Person })
    @ApiResponse({ status: 200, type: PersonOccupation })
    @Post()
    async getOnePerson(@Body() payload: any){
        return await this.personService.send('getOnePerson', payload)
    }

    @Post('/file')
    @UseInterceptors(FileInterceptor('image'))
    async createFile(@UploadedFile() image: any){
        return await this.fileService.send('createFile', image)
    }

}