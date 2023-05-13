import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {FilmOccupation} from "@app/shared/models/film_occupation.model";
import {PersonBestFilm} from "@app/shared/models/person_best_film.model";
import {Film} from "@app/shared/models/film.model";
import {FilmCountry} from "@app/shared/models/film_country.model";
import {PersonOccupation} from "@app/shared/models/person_occupation.model";
import {CountryViewer} from "@app/shared/models/country_viewer.model";
import {MainActor} from "@app/shared/models/main_actor.model";
import {Occupation} from "@app/shared/models/occupation.model";
import {FilmGenre} from "@app/shared/models/film_genre.model";
import {Country} from "@app/shared/models/country.model";
import {PersonCountry} from "@app/shared/models/person_counrty.model";
import {Genre} from "@app/shared/models/genre.model";
import {PersonGenre} from "@app/shared/models/person_genre.model";
import {Person} from "@app/shared/models/person.model";
import {SimilarFilm} from "@app/shared/models/similar_film.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'postgres',
            password: 'rootroot',
            database: "dbkinopoisk",
            models: [Country,
                CountryViewer,
                Film,
                FilmCountry,
                FilmGenre,
                FilmOccupation,
                Genre,
                MainActor,
                Occupation,
                Person,
                PersonBestFilm,
                PersonGenre,
                SimilarFilm,
                PersonCountry,
                PersonOccupation,],
            autoLoadModels: true,


        })
    ]

})
export class PostgresdbModule {}
