import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {GenreController} from "./controllers/genre.controller";
import {CountryController} from "./controllers/country.controller";
import {PersonController} from "./controllers/person.controller";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {FileModule} from "./file/file.module";
import {ProfileController} from "./controllers/profile.controller";
import {JwtModule} from "@nestjs/jwt";
import {FilmController} from "./controllers/film.controller";
import {OccupationController} from "./controllers/occupation.controller";
import {CommentController} from "./controllers/comment.controller";
import {CommentModule} from "./comment/comment.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {CommentFilm} from "@app/shared/models/comment.model";
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './.env',
  }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', '..', '..', 'picture')
    }),

    CommentModule,
    FileModule,
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('FILM_SERVICE', process.env.RABBITMQ_FILM_QUEUE),
    SharedModule.registerRmq('PERSON_SERVICE', process.env.RABBITMQ_PERSON_QUEUE),
    SharedModule.registerRmq('GENRE_SERVICE', process.env.RABBITMQ_GENRE_QUEUE),
    SharedModule.registerRmq('COUNTRY_SERVICE', process.env.RABBITMQ_COUNTRY_QUEUE),
    SharedModule.registerRmq('OCCUPATION_SERVICE', process.env.RABBITMQ_OCCUPATION_QUEUE),
    SharedModule.registerRmq('FILE_SERVICE', process.env.RABBITMQ_FILE_QUEUE),
    SharedModule.registerRmq('PROFILE_SERVICE', process.env.RABBITMQ_PROFILE_QUEUE),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('PRIVATE_KEY'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),




  ],

  controllers: [GenreController,
    CountryController,
    PersonController,
    ProfileController,
    FilmController,
    OccupationController,
    CommentController],

})
export class AppModule {}
