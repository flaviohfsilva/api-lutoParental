import { Module } from '@nestjs/common';
import { VerificacaoService } from './verificacao.service';
import { VerificacaoController } from './verificacao.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { verificacaoProviders } from './verificacao.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [VerificacaoController],
  providers: [VerificacaoService, ...verificacaoProviders],
  exports: [VerificacaoService, ...verificacaoProviders],
})
export class VerificacaoModule {}
