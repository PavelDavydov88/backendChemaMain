import {Injectable, NotFoundException} from '@nestjs/common';
import {User} from "@app/shared/models/user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateProfileDto} from "@app/shared/dtos/auth-dto/create-profile.dto";
import {RpcException} from "@nestjs/microservices";

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

    async deleteUser(dto : CreateProfileDto){
        const user = await this.userRepository.destroy({where : {
            email: dto.email
            }})
        if(!user){
            throw new RpcException(
                new NotFoundException("Пользователя с таким email не существует")

            )
        }else return user
    }

    async updateUser(dto: CreateProfileDto){
        const user = await this.userRepository.update(dto, {where: {
            email: dto.email
            }})
        if(!user){
            throw new RpcException(
                new NotFoundException('Пользователя с таким email не существует')

            )
        }else return user
    }



}
