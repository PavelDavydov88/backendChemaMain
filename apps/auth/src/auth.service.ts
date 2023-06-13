import {HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs"
import {UserService} from "./user/user.service";
import {ProfileService} from "./profile/profile.service";
import {CreateProfileDto} from "@app/shared/dtos/auth-dto/create-profile.dto";
import {RpcException} from "@nestjs/microservices";


@Injectable()
export class AuthService {

  constructor(
              private jwtService: JwtService,
              private userService: UserService,
              private profileService: ProfileService,

              ) {}

  async login(profileDto: CreateProfileDto){

    const user = await this.validateUser(profileDto)
    return this.generateToken(user)


  }

  async registration(profileDto : CreateProfileDto){
    const candidate = await this.userService.getUserByEmail(profileDto.email)

    if (candidate){
      throw new RpcException(
          new NotFoundException('Пользователь с таким email уже существует')
      )
    }
    const hashPassword = await bcryptjs.hash(profileDto.password, 5);
    const user = await this.profileService.createProfile({...profileDto, password: hashPassword})
    // console.log(await this.profileService.createProfile({...userDto, password: hashPassword}))
    return this.generateToken(user)


  }
  private async generateToken(user){
    //не видит email
    const payload = {email: user.email, id:user.id, roles: user.roles};
    return {
      token: this.jwtService.sign(payload)
    }
  }
  private async validateUser (dto: CreateProfileDto){
    const user = await this.userService.getUserByEmail(dto.email)

    const passwordEquals = await bcryptjs.compare(dto.password, user.password);

    if (user && passwordEquals){
        return user;
    }
    throw new RpcException(
        new UnauthorizedException({message: 'Некоректный mail или password'})
    )

    }
    async deleteUser(id: number, req: Request){
    // const headerAuth = req.headers['authorization']
      console.log(req, id);
    }



}