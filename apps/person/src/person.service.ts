import { Injectable } from '@nestjs/common';
import {Person} from "@app/shared/models/person.model";
import {InjectModel} from "@nestjs/sequelize";
import {PersonCountry} from "@app/shared/models/person_counrty.model";
import {PersonGenre} from "@app/shared/models/person_genre.model";
import {PersonOccupation} from "@app/shared/models/person_occupation.model";
import {Country} from "@app/shared/models/country.model";
import {Genre} from "@app/shared/models/genre.model";
import {Occupation} from "@app/shared/models/occupation.model";
import {CreatePersonDto} from "./dto/createPerson.dto";

@Injectable()
export class PersonService {
  constructor(@InjectModel(Person) private personRepository: typeof Person,
              @InjectModel(PersonCountry) private personCountryRepository: typeof PersonCountry,
              @InjectModel(PersonGenre) private personGenreRepository: typeof PersonGenre,
              @InjectModel(PersonOccupation) private personOccupationRepository: typeof PersonOccupation) {
  }
  async getAllPerson(){
    const persons =await this.personRepository.findAll()
    return persons
  }
  async getByValue(dto: CreatePersonDto){
    const person  = await this.personRepository.findOne({ where: { name: dto.name } } )

    const personCountry = await this.personCountryRepository.findAll({ where: { person_id: person.id }, include: { model:  Country  } } )
    const personGenre = await this.personGenreRepository.findAll({ where: { person_id: person.id }, include: { model: Genre } } )
    const personOccupation = await this.personOccupationRepository.findAll({ where: { person_id: person.id }, include: { model: Occupation } } )

    return {
      person, personCountry, personGenre, personOccupation
    }
  }
  async createPerson(dto: CreatePersonDto){
    const person = await this.personRepository.create(dto)
    return person
  }



}
