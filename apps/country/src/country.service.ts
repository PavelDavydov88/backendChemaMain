import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Country} from "@app/shared/models/country.model";
import {CreateCountryDto} from "./dto/createCountry.dto";
import {where} from "sequelize";
import {UpdateCountryDto} from "./dto/updateCountry.dto";
import {CreateGenreDto} from "../../genre/src/dto/createGenre.dto";

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country) private countryRepository: typeof Country) {}

  async getAllCounbtry(){
    const country = this.countryRepository.findAll()
    return country
  }
  async createCountry(dto: CreateCountryDto){
    const getCountry = await this.countryRepository.findAll({
      where: {name: dto.name}})
    if (getCountry){
      throw new HttpException('такая страна уже есть', HttpStatus.BAD_REQUEST)
    }else{
      const createCountry = await this.countryRepository.create(dto)
      return createCountry
    }

  }

  async updateCountry(dto: UpdateCountryDto){
    const country = await this.countryRepository.update(dto, {where: {id: dto.id}})
    return country
  }
  async deleteCountry(dto: CreateGenreDto){
    const id = await this.countryRepository.findOne({where: {name: dto.name}})
    if(id){
      const country = await this.countryRepository.destroy({where: {id: id.id}})
      return country
    }else{
      throw new HttpException('Такой страны не существует', HttpStatus.BAD_REQUEST)
    }
  }
}
