import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "@app/shared/modules/shared/shared.module";
import { GenreController } from "./genre.controller";
import { CountryController } from "./country.controller";
import { FilmController } from "./film.controller";
import { OccupationController } from "./occupation.controller";
import { FilesController } from "./files.controller";
import { AppService } from "./app.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CommentModule } from "./comment/comment.module";
import * as path from "path";
import { CommentController } from "./comment.controller";
import { PostgresdbModule } from "@app/shared/modules/postgresdb/postgresdb.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentFilm } from "@app/shared/models/comment.model";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: "./.env"
  }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "..", "..", "static")
    }),
    SharedModule.registerRmq("AUTH_SERVICE", process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq("FILM_SERVICE", process.env.RABBITMQ_FILM_QUEUE),
    SharedModule.registerRmq("PERSON_SERVICE", process.env.RABBITMQ_PERSON_QUEUE),
    SharedModule.registerRmq("GENRE_SERVICE", process.env.RABBITMQ_GENRE_QUEUE),
    SharedModule.registerRmq("COUNTRY_SERVICE", process.env.RABBITMQ_COUNTRY_QUEUE),
    SharedModule.registerRmq("OCCUPATION_SERVICE", process.env.RABBITMQ_OCCUPATION_QUEUE),
    SharedModule.registerRmq("FILES_SERVICE", process.env.RABBITMQ_FILES_QUEUE),
    PostgresdbModule,
    SequelizeModule.forFeature([
      CommentFilm
    ]),
    CommentModule

  ],

  controllers: [
    AppController,
    GenreController,
    CountryController,
    FilmController,
    OccupationController,
    FilesController,
    CommentController
  ],
  providers: [AppService]

})
export class AppModule {
}
