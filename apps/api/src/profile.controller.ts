import {Body, Controller, Delete, Get, Inject, Param, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {CreateProfileDto} from "@app/shared/dtos/auth-dto/create-profile.dto";
import {CreateRoleDto} from "@app/shared/dtos/auth-dto/user-role.dto";


@Controller('profile')
export class ProfileController{
    constructor(
        // @Inject('PROFILE_SERVICE') private profileSerivce: ClientProxy,
                @Inject('AUTH_SERVICE') private authService: ClientProxy
                ) {
    }

    @Post('/register')
    async registerProfile(@Body() payload: CreateProfileDto){
        return await this.authService.send('register', payload)
    }
    @Post('/login')
    async loginProfile(@Body() payload: CreateProfileDto){
        return await this.authService.send('login', payload)
    }


    @Post('/role')
    async createRole(@Body() paylaod: CreateRoleDto){
        return await this.authService.send('createRole', paylaod)
    }

    @Delete('/:id')
    async deleteProfile(@Param("id") payload: number){
        return await this.authService.send('deleteProfile', payload)
    }

}