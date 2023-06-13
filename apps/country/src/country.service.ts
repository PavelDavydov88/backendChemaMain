import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Country } from "@app/shared/models/country.model";
import { CreateCountryDto } from "@app/shared/dtos/country-dto/createCountry.dto";
import { UpdateCountryDto } from "@app/shared/dtos/country-dto/updateCountry.dto";
import { RpcException } from "@nestjs/microservices";
import { DeleteCountryDto } from "@app/shared/dtos/country-dto/deleteCountry.dto";

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country) private countryRepository: typeof Country) {
  }

  async getAllCountry() {
    return this.countryRepository.findAll();
  }

  async createCountry(dto: CreateCountryDto) {
    const getCountry = await this.countryRepository.findOne({
      where: { name: dto.name }
    });
    if (getCountry) {
      throw new RpcException(
        new NotFoundException(`Такая страна уже есть!`));
    } else {
      return await this.countryRepository.create(dto);
    }
  }

  async updateCountry(dto: UpdateCountryDto) {
    const country = await this.countryRepository.findOne({ raw: true, where: { id: dto.id } });
    if (!country) {throw new RpcException(
      new NotFoundException(`Такая страна не найдена!`));}
    return await this.countryRepository.update(dto, { where: { id: dto.id } });
  }

  async deleteCountry(id: number) {
    const country = await this.countryRepository.destroy({where : {
      id: id
      }})
    if(country) return country
    else throw new RpcException(
        new NotFoundException('Такой страны не существует')
    )

  }
}
