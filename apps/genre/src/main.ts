import { NestFactory } from "@nestjs/core";
import { GenreModule } from "./genre.module";
import { ConfigService } from "@nestjs/config";
import { SharedService } from "@app/shared/services/shared/shared.service";

async function bootstrap() {
  const app = await NestFactory.create(GenreModule);

  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_GENRE_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
