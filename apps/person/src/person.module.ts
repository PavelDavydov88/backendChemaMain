import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import {SharedService} from "@app/shared/services/shared/shared.service";
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "@app/shared/modules/shared/shared.module";
import {PostgresdbModule} from "@app/shared/modules/postgresdb/postgresdb.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Person} from "@app/shared/models/person.model";
import {PersonOccupation} from "@app/shared/models/person_occupation.model";
import {PersonGenre} from "@app/shared/models/person_genre.model";
import {PersonCountry} from "@app/shared/models/person_counrty.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresdbModule,
    SequelizeModule.forFeature([
        Person,
        PersonOccupation,
        PersonGenre,
        PersonCountry
    ]),
    SharedModule.registerRmq('GENRE_SERVICE', process.env.RABBITMQ_GENRE_QUEUE),
    SharedModule.registerRmq('COUNTRY_SERVICE', process.env.RABBITMQ_COUNTRY_QUEUE),
    SharedModule.registerRmq('OCCUPATION_SERVICE', process.env.RABBITMQ_OCCUPATION_QUEUE),
  ],
  controllers: [PersonController],
  providers: [PersonService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
  ],
})
export class PersonModule {}
