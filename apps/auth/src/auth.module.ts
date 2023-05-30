import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "@app/shared/modules/shared/shared.module";
import { PostgresdbModule } from "@app/shared/modules/postgresdb/postgresdb.module";
import { SharedService } from "@app/shared/services/shared/shared.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { PersonModule } from "../../person/src/person.module";
import { Person } from "@app/shared/models/person.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),
    SharedModule,
    PostgresdbModule,
    SequelizeModule.forFeature([
      Person
    ]),
    SharedModule,
    PostgresdbModule


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
