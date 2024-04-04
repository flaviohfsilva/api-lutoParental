import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Luto Parental')
    .setDescription('Documentação API Luto Parental')
    .setVersion('1.0')
    .addTag('Depoimentos')
    .addTag('Notícias')
    .addTag('Direitos')
    .addTag('Tags')
    .addTag('Estados')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT || 3002);
}
bootstrap();
