import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SharedModule } from "@app/shared/modules/shared/shared.module";
import { GenreController } from "./genre.controller";
import { CountryController } from "./country.controller";
import { FilmController } from "./film.controller";
import { OccupationController } from "./occupation.controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CommentModule } from "./comment/comment.module";
import * as path from "path";
import { CommentController } from "./comment.controller";
import { PostgresdbModule } from "@app/shared/modules/postgresdb/postgresdb.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentFilm } from "@app/shared/models/comment.model";
import { FileModule } from "./file/file.module";
import { JwtModule } from "@nestjs/jwt";
import { PersonController } from "./person.controller";
import { ProfileController } from "./profile.controller";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: "./.env"
  }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "..", "..", "static")
    }),
    FileModule,
    SharedModule.registerRmq("AUTH_SERVICE", process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq("FILM_SERVICE", process.env.RABBITMQ_FILM_QUEUE),
    SharedModule.registerRmq("PERSON_SERVICE", process.env.RABBITMQ_PERSON_QUEUE),
    SharedModule.registerRmq("GENRE_SERVICE", process.env.RABBITMQ_GENRE_QUEUE),
    SharedModule.registerRmq("COUNTRY_SERVICE", process.env.RABBITMQ_COUNTRY_QUEUE),
    SharedModule.registerRmq("OCCUPATION_SERVICE", process.env.RABBITMQ_OCCUPATION_QUEUE),
    SharedModule.registerRmq('PROFILE_SERVICE', process.env.RABBITMQ_PROFILE_QUEUE),
    PostgresdbModule,
    SequelizeModule.forFeature([
      CommentFilm
    ]),
    CommentModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('PRIVATE_KEY'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),

  ],

  controllers: [
    GenreController,
    CountryController,
    FilmController,
    OccupationController,
    CommentController,
    PersonController,
    ProfileController,
  ],

})
export class AppModule {
}
