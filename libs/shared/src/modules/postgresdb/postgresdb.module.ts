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
import {Profile} from "@app/shared/models/profile.model";
import {Roles} from "@app/shared/decorators/role-auth.decorator";
import {Role} from "@app/shared/models/role.model";
import {User} from "@app/shared/models/user.model";
import {UserRoles} from "@app/shared/models/user-role.model";
import {Film_file} from "@app/shared/models/film_file.model";
import {Person_file} from "@app/shared/models/person._file.model";
import {CommentFilm} from "@app/shared/models/comment.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
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
                PersonOccupation,
                Profile,
                Role,
                User,
                UserRoles,
                Film_file,
                Person_file,
                CommentFilm
            ],
            autoLoadModels: true,


        })
    ]

})
export class PostgresdbModule {}
