import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcExceptionFilter } from "./exception.filter/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new RpcExceptionFilter())
  await app.listen(5000);
}
bootstrap();
