import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { SharedModule } from "@app/shared/modules/shared/shared.module";
import { ConfigModule } from "@nestjs/config";
import { SharedService } from "@app/shared/services/shared/shared.service";
import { FilesController } from "./files.controller";

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './.env',
  }),
    SharedModule,],
  controllers: [FilesController],
  providers: [FilesService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },],
})
export class FilesModule {}
