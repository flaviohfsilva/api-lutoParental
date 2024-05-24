import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepoimentosModule } from './depoimentos/depoimentos.module';
import { NoticiasModule } from './noticias/noticias.module';
import { TagsModule } from './tags/tags.module';
import { DireitosModule } from './direitos/direitos.module';
import { EstadosModule } from './estados/estados.module';
import { DiscordModule } from './discord/discord.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ConfigModule } from '@nestjs/config';
import { VerificacaoModule } from './verificacao/verificacao.module';

@Module({
  imports: [
    DepoimentosModule,
    NoticiasModule,
    TagsModule,
    DireitosModule,
    EstadosModule,
    NewsletterModule,
    DiscordModule,
    ConfigModule.forRoot(),
    VerificacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
