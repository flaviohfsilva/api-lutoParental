import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { noticiaProviders } from './noticias.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NoticiasController],
  providers: [...noticiaProviders, NoticiasService],
})
export class NoticiasModule {}
