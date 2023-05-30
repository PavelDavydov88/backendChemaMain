import { Module } from "@nestjs/common";
import { OccupationController } from "./occupation.controller";
import { OccupationService } from "./occupation.service";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "@app/shared/modules/shared/shared.module";
import { PostgresdbModule } from "@app/shared/modules/postgresdb/postgresdb.module";
import { SharedService } from "@app/shared/services/shared/shared.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Occupation } from "@app/shared/models/occupation.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresdbModule,
    SequelizeModule.forFeature([
      Occupation
    ]),


  ],
  controllers: [OccupationController],
  providers: [OccupationService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },],
})
export class OccupationModule {}
