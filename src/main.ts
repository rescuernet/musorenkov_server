import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationBodyPipe} from "./pipes/validation-body.pipe";
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.use(cookieParser());
  app.enableCors({
    allowedHeaders:"authorization,content-type",
    credentials: true,
    origin: process.env.CLIENT_URL
  });


  app.useGlobalPipes(new ValidationBodyPipe())
  await app.listen(PORT, () => console.log(`run server port ${PORT}`));
}
bootstrap();

