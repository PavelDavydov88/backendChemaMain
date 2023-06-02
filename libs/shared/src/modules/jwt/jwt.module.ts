import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports:[
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('PRIVATE_KEY'),
                signOptions: { expiresIn: '3600s' },
            }),
            inject: [ConfigService],
        })
    ]


})

export class Jwt_Module  {}
