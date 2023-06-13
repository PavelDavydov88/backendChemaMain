import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentFilm } from "@app/shared/models/comment.model";
import { JwtService } from "@nestjs/jwt";
import { Profile } from "@app/shared/models/profile.model";
import { UserRoles } from "@app/shared/models/user-role.model";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {SharedService} from "@app/shared/services/shared/shared.service";

@Module({
  imports: [
    SequelizeModule.forFeature([
      CommentFilm, Profile, UserRoles
    ]),
    SharedModule,
    PostgresdbModule,
  ],
  providers: [CommentService, JwtService,  {
    provide: 'SharedServiceInterface',
    useClass: SharedService,
  },],
  exports: [CommentService]

})
export class CommentModule {
}
