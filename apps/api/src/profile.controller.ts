import {Body, Controller, Delete, Get, Inject, Param, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {CreateProfileDto} from "@app/shared/dtos/auth-dto/create-profile.dto";
import {CreateRoleDto} from "@app/shared/dtos/auth-dto/user-role.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Role} from "@app/shared/models/role.model";


@Controller('profile')
export class ProfileController{
    constructor(
        // @Inject('PROFILE_SERVICE') private profileSerivce: ClientProxy,
                @Inject('AUTH_SERVICE') private authService: ClientProxy
                ) {
    }
    @ApiOperation({ summary: "Регистрация нового пользователя", tags: ['profile'] })
    @ApiResponse({ status: 200 })
    @Post('/register')
    async registerProfile(@Body() payload: CreateProfileDto){
        return await this.authService.send('register', payload)
    }

    @ApiOperation({ summary: "Авторизация нового пользователя", tags: ['profile'] })
    @ApiResponse({ status: 200 })
    @Post('/login')
    async loginProfile(@Body() payload: CreateProfileDto){
        return await this.authService.send('login', payload)
    }

    @ApiOperation({ summary: "Создать Роль ", tags: ['profile'] })
    @ApiResponse({ status: 200, type: Role })
    @Post('/role')
    async createRole(@Body() paylaod: CreateRoleDto){
        return await this.authService.send('createRole', paylaod)
    }
    @ApiOperation({ summary: "Удалить профиль ", tags: ['profile'] })
    @ApiResponse({ status: 200 })
    @Delete('/:id')
    async deleteProfile(@Param("id") payload: number){
        return await this.authService.send('deleteProfile', payload)
    }

}