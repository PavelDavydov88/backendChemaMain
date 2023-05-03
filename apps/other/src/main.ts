import { NestFactory } from '@nestjs/core';
import { OtherModule } from './other.module';

async function bootstrap() {
  const app = await NestFactory.create(OtherModule);
  await app.listen(3000);
}
bootstrap();
