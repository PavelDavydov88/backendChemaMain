import { NestFactory } from '@nestjs/core';
import { OtherModule } from './other.module';
import {ConfigService} from "@nestjs/config";
import {SharedService} from "@app/shared/services/shared/shared.service";

async function bootstrap() {
  const app = await NestFactory.create(OtherModule);
  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_OTHER_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
