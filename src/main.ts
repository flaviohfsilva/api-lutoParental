import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Luto Parental')
    .setDescription('Documentação API Luto Parental')
    .setVersion('1.0')
    .addTag('Depoimentos')
<<<<<<< HEAD
    .addTag('Notícias')
    .addTag('Direitos')
=======
    .addTag('Direitos')
    .addTag('Notícias')
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64
    .addTag('Tags')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT || 3002);
}
bootstrap();
