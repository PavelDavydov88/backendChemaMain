import { NestFactory } from '@nestjs/core';
import {ConfigService} from "@nestjs/config";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {FilmModule} from "./film.module";

async function bootstrap() {
  const app = await NestFactory.create(FilmModule);

  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_FILM_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap(); 
