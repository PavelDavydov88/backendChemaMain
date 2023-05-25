import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Country} from "@app/shared/models/country.model";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,

  ],
  controllers: [FilesController],
  providers: [FilesService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
  ],
})
export class FilesModule {}
