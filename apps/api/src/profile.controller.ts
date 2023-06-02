import {Body, Controller, Delete, Get, Inject, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {CreateProfileDto} from "../../auth/src/dto/create-profile.dto";
import {CreateRoleDto} from "../../auth/src/dto/user-role.dto";


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

    // @Get()
    // async getprofiles(){
    //     return await this.profileSerivce.send('getProfiles', {})
    // }
    //
    // @Delete('/role')
    // async deleteRole(@Body() payload: CreateRoleDto){
    //     return await this.profileSerivce.send('deleteRole', payload )
    // }
}