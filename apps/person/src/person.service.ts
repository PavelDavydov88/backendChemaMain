import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Person} from "@app/shared/models/person.model";
import {InjectModel} from "@nestjs/sequelize";
import {PersonCountry} from "@app/shared/models/person_counrty.model";
import {PersonGenre} from "@app/shared/models/person_genre.model";
import {PersonOccupation} from "@app/shared/models/person_occupation.model";
import {Country} from "@app/shared/models/country.model";
import {Genre} from "@app/shared/models/genre.model";
import {Occupation} from "@app/shared/models/occupation.model";
import {CreatePersonDto} from "./dto/createPerson.dto";
import {PersonDto} from "./dto/person.dto";
import {PersonBestFilm} from "@app/shared/models/person_best_film.model";
import {UpdateFilmDto} from "../../film/src/dto/updateFilm.dto";
import {UpdatePersonDto} from "./dto/updatePerson.dto";

@Injectable()
export class PersonService {
  constructor(@InjectModel(Person) private personRepository: typeof Person,
              @InjectModel(PersonCountry) private personCountryRepository: typeof PersonCountry,
              @InjectModel(PersonGenre) private personGenreRepository: typeof PersonGenre,
              @InjectModel(PersonOccupation) private personOccupationRepository: typeof PersonOccupation,
              @InjectModel(Country) private countryRerepository: typeof Country,
              @InjectModel(Genre) private genreRepository: typeof Genre,
              @InjectModel(Occupation) private occupationRepository: typeof Occupation,
              @InjectModel(PersonBestFilm) private bestFilmRepository: typeof PersonBestFilm
  ) {}
  async getAllPerson(){


    const persons =await this.personRepository.findAll()
    return persons
  }
  async getByValue(id : number){
    const person  = await this.personRepository.findOne({ where: { id: id  } } )

    const personCountry = await this.personCountryRepository.findAll({ where: { person_id: id }, include: { model:  Country  } } )
    const personGenre = await this.personGenreRepository.findAll({ where: { person_id: id }, include: { model: Genre } } )
    const personOccupation = await this.personOccupationRepository.findAll({ where: { person_id: id }, include: { model: Occupation } } )

    return {
      person, personCountry, personGenre, personOccupation
    }
  }
  async deletePerson(dto: CreatePersonDto){
    const person = await this.personRepository.findOne({
      where:
          { name: dto.name }
    })
    if(!person) return new HttpException('Такого работника кино не существует', HttpStatus.BAD_REQUEST)
    return await this.personRepository.destroy({ where: {
      name: dto.name
      }})
  }
  async updatePerson(dto: UpdatePersonDto, id: number){
    const person = await this.personRepository.findOne({ where: {
      id: id
      } })
    if(!person) return new HttpException('Такого работника кино не сущесвует', HttpStatus.BAD_REQUEST )
    return await this.personRepository.update({ name: dto.newName }, { where: { id : id }})
  }


  async createPerson(dto: CreatePersonDto){
    const getPerson = await this.personRepository.findOne({
      where: { name: dto.name }
    })
    console.log('dto =' + JSON.stringify(dto))
    if (getPerson)
      return new HttpException('это имя уже занято', HttpStatus.BAD_REQUEST)
    const createPerson = await this.personRepository.create(dto)
    const country = await this.countryRerepository.findOne({ where: {
      name: dto.country } } );

    const genres = await this.genreRepository.findAll({ attributes: ["id", "name"], raw: true });
    const occupation = await this.occupationRepository.findAll({ attributes: ["id", "name"], raw: true });
    const bestFilm = await this.occupationRepository.findAll({ attributes: ["id", "name"], raw: true });

    const genresPerson = dto.genre;
    const occupationsPerson = dto.occupation;
    const bestFilmPerson = dto.bestFilm;
    if(!genresPerson == undefined){
      const idGenres: number[] = genres.filter(genre => genresPerson.includes(genre.name)).map(id => id.id);
      await this.saveArrayToPersonGenre(createPerson.id, idGenres, this.personGenreRepository);
    }

    if(!occupationsPerson == undefined){
      const idOccupation: number[] = occupation.filter(occupation => occupationsPerson.includes(occupation.name)).map(id => id.id);
      await this.saveArrayToPersonOccupation(createPerson.id, idOccupation, this.personOccupationRepository)
    }

    if(!bestFilmPerson == undefined){
      const idBestFilm: number[] = bestFilm.filter(bestFilm => bestFilmPerson.includes(bestFilm.name)).map(id => id.id);
      await this.saveArrayToPersonBestFilm(createPerson.id, idBestFilm, this.bestFilmRepository)
    }

    if(!country == undefined){
      await this.personCountryRepository.create({person_id: createPerson.id, country_id: country.id})

    }

    return createPerson;
  }


  private async saveArrayToPersonGenre(idPerson: number, arrayIdEntity: number[], model: any){
    for (let i = 0; i < arrayIdEntity.length; i++){
      await model.create({ person_id: idPerson, genre_id: arrayIdEntity[i] })
    }
  }
  private async saveArrayToPersonOccupation(idPerson: number, arrayIdEntity: number[], model: any ){
    for (let i = 0; i < arrayIdEntity.length; i++){
      await model.create({ person_id: idPerson, occupation_id: arrayIdEntity[i] })
    }
  }
  private async saveArrayToPersonBestFilm(idPerson: number, arrayIdEntity: number[], model: any ){
    for (let i = 0; i < arrayIdEntity.length; i++){
      await model.create({ person_id: idPerson, film_id: arrayIdEntity[i] })
    }
  }



}
