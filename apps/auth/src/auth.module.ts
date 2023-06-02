import {forwardRef, Module} from "@nestjs/common";
import { AuthController } from "./auth.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { SharedModule } from "@app/shared/modules/shared/shared.module";
import { SharedService } from "@app/shared/services/shared/shared.service";
import {AuthService} from "./auth.service";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {JwtModule} from "@nestjs/jwt";
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import {RolesModule} from "./role/role.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),

    SharedModule,
    PostgresdbModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('PRIVATE_KEY'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    forwardRef(() => ProfileModule),
    RolesModule

    // forwardRef(() => UserModule),

    // forwardRef(() => SharedModule),
    // forwardRef(() => PostgresdbModule)




  ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: "SharedServiceInterface",
      useClass: SharedService
    }

  ]
})
export class AuthModule {
}
