import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalConfig } from './configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = GlobalConfig.port;

  const config = new DocumentBuilder()
    .setTitle('Welcome to Swagger')
    .setDescription('Ready For Test')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      requestInterceptor: (req) => {
        //Added your basic auth below 
        req.headers['Authorization'] = 'Basic cXVlcnk6MTIzNDU2';
        return req;
      },
    }
  });

  await app.listen(port, () => {
    console.log(`Server Running on ${port}`);
  });
}

bootstrap();
