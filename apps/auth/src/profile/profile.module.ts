import {ProfileController} from "./profile.controller";
import {ProfileService} from "./profile.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {Profile} from "@app/shared/models/profile.model";
import {forwardRef, Module} from "@nestjs/common";
import {AuthModule} from "../auth.module";
import {Role} from "@app/shared/models/role.model";
import {User} from "@app/shared/models/user.model";
import {RolesModule} from "../role/role.module";
import {UserModule} from "../user/user.module";


@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: './.env',
    // }),
    //
    //
    // ,
   SequelizeModule.forFeature([
       Profile,
       Role,
       User

   ]) ,
    forwardRef(() => AuthModule),
    RolesModule,
    UserModule


  ],
  exports: [
      ProfileService
  ]
})
export class ProfileModule {}
