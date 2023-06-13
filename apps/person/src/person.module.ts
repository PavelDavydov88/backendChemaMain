import {Module} from '@nestjs/common';
import {PersonController} from './person.controller';
import {PersonService} from './person.service';
import {SharedService} from "@app/shared/services/shared/shared.service";
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Person} from "@app/shared/models/person.model";
import {PersonOccupation} from "@app/shared/models/person_occupation.model";
import {PersonGenre} from "@app/shared/models/person_genre.model";
import {PersonCountry} from "@app/shared/models/person_counrty.model";
import {Country} from "@app/shared/models/country.model";
import {Occupation} from "@app/shared/models/occupation.model";
import {Genre} from "@app/shared/models/genre.model";
import {PersonBestFilm} from "@app/shared/models/person_best_film.model";
import {Film} from "@app/shared/models/film.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresdbModule,
    SequelizeModule.forFeature([
        Person,
        PersonOccupation,
        PersonGenre,
        PersonCountry,
        Country,
        Occupation,
        Genre,
        PersonBestFilm,
        Film,

    ]),

  ],
  controllers: [PersonController],
  providers: [PersonService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
  ],
})
export class PersonModule {}
