import {SetMetadata} from "@nestjs/common";

export const ROLES_KEY = 'roles'; // по этому ключу можно получать какие то методанные внутри гуарда

export const  Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);