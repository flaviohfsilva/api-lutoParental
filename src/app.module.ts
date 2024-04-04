import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepoimentosModule } from './depoimentos/depoimentos.module';
import { NoticiasModule } from './noticias/noticias.module';
import { TagsModule } from './tags/tags.module';
import { DireitosModule } from './direitos/direitos.module';
import { EstadosModule } from './estados/estados.module';

@Module({
  imports: [DepoimentosModule, NoticiasModule, TagsModule, DireitosModule, EstadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
