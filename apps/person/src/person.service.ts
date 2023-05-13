import { Injectable } from '@nestjs/common';
import {Person} from "@app/shared/models/person.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class PersonService {
  // constructor(@InjectModel(Person) private personRepository: typeof Person) {
  // }
  // async getAllPerson(){
  //   const persons =await this.personRepository.findAll()
  //   return persons
  // }



}
