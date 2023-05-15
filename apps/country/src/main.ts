import { NestFactory } from '@nestjs/core';
import { CountryModule } from './country.module';
import {AuthModule} from "../../auth/src/auth.module";
import {ConfigService} from "@nestjs/config";
import {SharedService} from "@app/shared/services/shared/shared.service";

async function bootstrap() {
  const app = await NestFactory.create(CountryModule);

  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_COUNTRY_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
