import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentFilm } from "@app/shared/models/comment.model";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";

@Module({
  imports: [
    PostgresdbModule,
    SequelizeModule.forFeature([
      CommentFilm
    ])],

  providers: [CommentService],
  exports: [CommentService]

})
export class CommentModule {
}
