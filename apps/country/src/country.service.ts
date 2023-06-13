import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Country} from "@app/shared/models/country.model";
import {CreateCountryDto} from "@app/shared/dtos/country-dto/createCountry.dto";
import {RpcException} from "@nestjs/microservices";

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

  async updateCountry(id: number, dto: CreateCountryDto) {
    const country = await this.countryRepository.update(dto, { where: { id: id } });
    if (!country) {throw new RpcException(
      new NotFoundException(`Такая страна не найдена!`));}
    return country
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
