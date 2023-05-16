import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Person} from "@app/shared/models/person.model";
import {Genre} from "@app/shared/models/genre.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresdbModule,
    SequelizeModule.forFeature([
      Genre
    ]),

  ],
  controllers: [GenreController],
  providers: [GenreService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },],
})
export class GenreModule {}
