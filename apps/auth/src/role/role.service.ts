import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Role} from "@app/shared/models/role.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateRoleDto} from "@app/shared/dtos/auth-dto/user-role.dto";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }

    async getAllRoles(){
        return await this.roleRepository.findAll()
    }
    async createRole(dto: CreateRoleDto){
        const checkRole = await this.roleRepository.findOne({
            where: { value: dto.value }
        })
        if(checkRole){
            throw  new RpcException(
                new NotFoundException('Такая роль уже существует')
            )
        }else {
            const role = await this.roleRepository.create(dto);
            return role;
        }

    }
    async getRolByValue(value: string){
        const role = await this.roleRepository.findOne({where: {value}})
        if (role) return role
        else {
            throw new RpcException(
                new NotFoundException('Такой роли не существет')
            )
        }
    }

    async deleteRole(dto: CreateRoleDto){
        const role = await this.roleRepository.findOne({where: {
                value: dto.value
            }})
        if(!role) throw new RpcException(
            new NotFoundException( 'Такой роли не существует' )
        )
        else return await this.roleRepository.destroy({ where: {
            value: dto.value } })

    }

    async updateRole(dto: CreateRoleDto){
        const role = await this.roleRepository.update(dto,{where : {
            value: dto.value
            }})
        if(role){
            return role
        }else{
            throw new RpcException(
                new NotFoundException('Такой роли не существует')
            )
        }
    }
}
