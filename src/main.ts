import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['POST', 'GET', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
      allowedHeaders: [
        'Origin',
        'Content-Type',
        'X-Auth-Token',
        'Authorization',
      ],
    },
  });
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Picturim')
    .setDescription('Picturim API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
