import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const serverConfig = config.get('server');
  console.log(`serverConfig: ${JSON.stringify(serverConfig)}`);

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from "${serverConfig.origin}"`);
  }

  const PORT = process.env.PORT || serverConfig.port;
  console.log(`port: ${PORT}`);
  console.log(`process.env.PORT: ${process.env.PORT}`);

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}

bootstrap();
