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
    .addBearerAuth(
      { 
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Basic', // I`ve tested not to use this field, but the result was the same
        scheme: 'Basic',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header'
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,{
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.headers['Authorization'] = 'Basic cXVlcnk6MTIzNDU2';
        return req;
      },
    },
  });

  await app.listen(port, () => {
    console.log(`Server Running on ${port}`);
  });
}

bootstrap();
