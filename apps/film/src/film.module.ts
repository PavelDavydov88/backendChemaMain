import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {SharedService} from "@app/shared/services/shared/shared.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Person } from "@app/shared/models/person.model";
import { Film } from "@app/shared/models/film.model";
import { Country } from "@app/shared/models/country.model";
import { FilmCountry } from "@app/shared/models/film_country.model";
import { Genre } from "@app/shared/models/genre.model";
import { FilmGenre } from "@app/shared/models/film_genre.model";
import { Occupation } from "@app/shared/models/occupation.model";
import { FilmOccupation } from "@app/shared/models/film_occupation.model";
import { MainActor } from "@app/shared/models/main_actor.model";
import { SimilarFilm } from "@app/shared/models/similar_film.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresdbModule,
    SequelizeModule.forFeature([
      Film, Country, FilmCountry, Genre, FilmGenre, Occupation, FilmOccupation, Person, MainActor, SimilarFilm,
    ]),


  ],
  controllers: [FilmController],
  providers: [FilmService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
  ],
})
export class FilmModule {}
