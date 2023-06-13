import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentFilm } from "@app/shared/models/comment.model";
import { JwtService } from "@nestjs/jwt";
import { Profile } from "@app/shared/models/profile.model";
import { UserRoles } from "@app/shared/models/user-role.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      CommentFilm, Profile, UserRoles
    ])
  ],
  providers: [CommentService, JwtService],
  exports: [CommentService]

})
export class CommentModule {
}
