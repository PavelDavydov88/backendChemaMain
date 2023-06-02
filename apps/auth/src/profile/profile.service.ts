import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "@app/shared/models/profile.model";
import {UserService} from "../user/user.service";
import {RolesService} from "../role/role.service";
import {CreateProfileDto} from "../dto/create-profile.dto";


@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                private RoleService: RolesService,
                private userService : UserService
    ) {}
    async createProfile(dtoProfile: CreateProfileDto){
        const profile = await this.profileRepository.create(dtoProfile)
        const user = await this.userService.createUser({...dtoProfile, email: dtoProfile.email, password: dtoProfile.password})
        const role = await this.RoleService.getRolByValue("ADMIN")
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
        return profileId
    }

    async update(dto : CreateProfileDto, id: number){
        const profile = await this.profileRepository.update(dto, {where: {id}});

        return profile
    }


    async delete (id: number){
        return await this.profileRepository.destroy({where: {id}})

    }

}
