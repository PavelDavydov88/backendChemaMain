import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Role} from "@app/shared/models/role.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateRoleDto} from "@app/shared/dtos/auth-dto/user-role.dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }
    async createRole(dto: CreateRoleDto){
        const role = await this.roleRepository.create(dto);
        return role;
    }
    async getRolByValue(value: string){
        const role = await this.roleRepository.findOne({where: {value}})
        return role
    }

    async deleteRole(dto: CreateRoleDto){
        const role = await this.roleRepository.findOne({where: {
                value: dto.value
            }})
        if(!role) return new HttpException('Такой роли не существует', HttpStatus.BAD_REQUEST)

        return await this.roleRepository.destroy({ where: { value: dto.value } })
    }
}
