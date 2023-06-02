import {Role} from "@app/shared/models/role.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {ConfigModule} from "@nestjs/config";
import {RolesService} from "./role.service";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {Module} from "@nestjs/common";


@Module({
  // controllers: [RolesController],
  providers: [RolesService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresdbModule,
    SequelizeModule.forFeature([
      Role

    ])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
