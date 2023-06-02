import {User} from "@app/shared/models/user.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {UserService} from "./user.service";
import {ConfigModule} from "@nestjs/config";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {Module} from "@nestjs/common";


@Module({
  // controllers: [UserController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresdbModule,
    SequelizeModule.forFeature([
      User,

    ])
  ],
  providers: [UserService],
  exports: [
    UserService
  ]
})
export class UserModule {}
