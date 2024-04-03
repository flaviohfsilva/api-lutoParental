import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { noticiaProviders } from './noticias.providers';
<<<<<<< HEAD
import { DatabaseModule } from 'src/database/database.module';
=======
import { DatabaseModule } from 'src/core/database/database.module';
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64

@Module({
  imports: [DatabaseModule],
  controllers: [NoticiasController],
  providers: [...noticiaProviders, NoticiasService],
})
export class NoticiasModule {}
