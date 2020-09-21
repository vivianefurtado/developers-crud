import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const options = new DocumentBuilder()
    .setTitle('Developers CRUD API')
    .setDescription('Documentação da API - Developers CRUD')
    .setVersion('1.0')
    .addTag('developers')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3001);
}
bootstrap();
