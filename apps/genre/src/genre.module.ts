import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {SharedService} from "@app/shared/services/shared/shared.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresdbModule,


  ],
  controllers: [GenreController],
  providers: [GenreService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },],
})
export class GenreModule {}
