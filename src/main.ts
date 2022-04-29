import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationBodyPipe} from "./pipes/validation-body.pipe";

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationBodyPipe())
  await app.listen(PORT, () => console.log(`run server port ${PORT}`));
}

bootstrap();
