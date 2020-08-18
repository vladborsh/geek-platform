/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { join } from 'path';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  if (process.env.NODE_ENV === 'production') {
    app.useStaticAssets(join(__dirname, '..', 'intern'));
  }

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost: ${port}/${globalPrefix}`);
  });
}

bootstrap();
