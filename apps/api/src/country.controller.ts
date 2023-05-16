import {Body, Controller, Delete, Get, Inject, Post, Put} from "@nestjs/common";
import {ClientProxy, Payload} from "@nestjs/microservices";

@Controller('country')
export class CountryController{
    constructor(@Inject('COUNTRY_SERVICE') private readonly countryService: ClientProxy ) {}

    @Get()
    async getAllCountry(){
        return await this.countryService.send(
            'getAllCountry',{}
        )
    }
    @Post()
    async createCountry(@Body() payload: any){
        return await this.countryService.send(
            'createCountry',
            payload
        )
    }
    @Put()
    async updateCountry(@Body() payload: any){
        return await this.countryService.send(
            'updateCountry',
            payload
        )
    }
    @Delete()
    async deleteCountry(@Body() payload: any){
        return await this.countryService.send(
            'deleteCountry',
            payload
        )
    }
}