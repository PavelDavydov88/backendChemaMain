import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";

import {ROLES_KEY} from "@app/shared/decorators/role-auth.decorator";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private jwtService : JwtService,
                private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles){
                return true;
            }
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role => requiredRoles.includes(role.value)); // проверка после декодировки jwt на доступ
        }catch (e){
            console.log(e)
            throw new HttpException("НЕТ ДОСТУПА", HttpStatus.FORBIDDEN)//НЕТ ДОСТУПА
        }
    }
}