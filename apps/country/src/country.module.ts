import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Genre} from "@app/shared/models/genre.model";
import {Country} from "@app/shared/models/country.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresdbModule,
    SequelizeModule.forFeature([
      Country
    ]),

  ],
  controllers: [CountryController],
  providers: [CountryService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },],
})
export class CountryModule {}
