import {Body, Controller, Delete, Get, Inject, Param, Post, Request, UseGuards} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {CreateProfileDto} from "@app/shared/dtos/auth-dto/create-profile.dto";
import {CreateRoleDto} from "@app/shared/dtos/auth-dto/user-role.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Role} from "@app/shared/models/role.model";
import {JwtAuthGuard} from "../../../auth/src/jwt-auth.guard";
import {Roles} from "@app/shared/decorators/role-auth.decorator";
import {RoleGuard} from "../guard/role.guard";
import {Profile} from "@app/shared/models/profile.model";


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
    @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    @Post('/role')
    async createRole(@Body() paylaod: CreateRoleDto){
        return await this.authService.send('createRole', paylaod)
    }
    @ApiOperation({ summary: "Удалить профиль ", tags: ['profile'] })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    @Roles("ADMIN", "USER")
    @Delete('/:id')
    async deleteProfile(@Param("id") payload: number,@Request() req: Request){
        const authHeader = req.headers["authorization"]
        return await this.authService.send('deleteProfile', {
            id: payload,
            authHeader: authHeader
        })
    }
    @ApiOperation({ summary: "Получить все профили ", tags: ['profile'] })
    @ApiResponse({ status: 200, type: Profile })
    @Get()
    @UseGuards(JwtAuthGuard)
    @UseGuards(RoleGuard)
    @Roles("ADMIN")
    async getAllProfiles(){
        return await this.authService.send('getAllProfiles', {})
    }

}