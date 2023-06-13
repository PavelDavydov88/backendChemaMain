import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "@app/shared/models/profile.model";
import {UserService} from "../user/user.service";
import {RolesService} from "../role/role.service";
import {CreateProfileDto} from "@app/shared/dtos/auth-dto/create-profile.dto";
import {RpcException} from "@nestjs/microservices";


@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                private RoleService: RolesService,
                private userService : UserService
    ) {}


    async createProfile(dtoProfile: CreateProfileDto){
        const profile = await this.profileRepository.create(dtoProfile)
        const user = await this.userService.createUser({...dtoProfile, email: dtoProfile.email, password: dtoProfile.password})
        const role = await this.RoleService.getRolByValue("USER")
        await user.$set('roles', [role.id])
        await user.$set('profile', [profile.id])

        profile.user = [user]
        user.roles = [role]
        return{
            profile, user
        }

    }

    async getAllProfiles(){
        const profiles = await this.profileRepository.findAll({include:{all: true}})
        return profiles
    }

    async getById(userId: number){
        const profileId = await this.profileRepository.findByPk(userId)
        if(profileId) return profileId
        else{
            throw new RpcException(
                new NotFoundException('Профиль не найден')
            )
        }
    }

    async update(dto : CreateProfileDto){
        const profile = await this.profileRepository.update(dto, {where: {email : dto.email}});
        if(profile){
            const user = await this.userService.updateUser(dto)
            return {
                profile, user
            }
        }else{
            throw new RpcException(
                new NotFoundException("Такого email не существует")
            )
        }

    }


    async delete (id: number){
        const profile = await this.profileRepository.destroy({where: {id}})
        if(!profile){
            throw new RpcException(
                new NotFoundException('Такого профиля не сущесвует')
            )
        }else return profile
        // const profile = await this.

    }

}
