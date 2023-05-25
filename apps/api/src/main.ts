import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcExceptionFilter } from "./exception.filter/exception.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('api для онлайн кинотеатра')
      .setVersion('1.0.0')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  app.enableCors();
  app.useGlobalFilters(new RpcExceptionFilter())
  await app.listen(5000);
}
bootstrap();
