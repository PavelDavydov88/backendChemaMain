import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from "@nestjs/common";
import {ClientProxy, Payload} from "@nestjs/microservices";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Country} from "@app/shared/models/country.model";

@Controller('country')
export class CountryController{
    constructor(@Inject('COUNTRY_SERVICE') private readonly countryService: ClientProxy ) {}
    @ApiOperation({ summary: ' Получить все страны ' })
    @ApiResponse({ status: 200, type: [Country] })
    @Get()
    async getAllCountry(){
        return await this.countryService.send(
            'getAllCountry',{}
        )
    }
    @ApiOperation({ summary: ' Создать страну ' })
    @ApiResponse({ status: 200, type: Country })
    @Post()
    async createCountry(@Body() payload: any){
        return await this.countryService.send(
            'createCountry',
            payload
        )
    }
    @ApiOperation({ summary: ' Обновить страну ' })
    @ApiResponse({ status: 200, type: Country })
    @Put()
    async updateCountry(@Body() payload: any){
        return await this.countryService.send(
            'updateCountry',
            payload
        )
    }
    @ApiOperation({ summary: ' Удалить страну ' })
    @ApiResponse({ status: 200, type: Country })
    @Delete()
    async deleteCountry(@Body() payload: any){
        return await this.countryService.send(
            'deleteCountry',
            payload
        )
    }
}