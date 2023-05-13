import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Person} from "@app/shared/models/person.model";

@Injectable()
export class AuthService {
  constructor(@InjectModel(Person) private personRepository: typeof Person) {
  }
  async getAllPerson(){
    const persons =await this.personRepository.findAll()

    return persons
  }
}
