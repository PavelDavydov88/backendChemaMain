import { Injectable } from '@nestjs/common';
import {User} from "@app/shared/models/user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateProfileDto} from "../dto/create-profile.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User ){}
    createUser(dto: CreateProfileDto){
        const user = this.userRepository.create({...dto})
        return user
    }
    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})

        return user
    }

}
