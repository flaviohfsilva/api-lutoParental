import { Module } from '@nestjs/common';
import { DepoimentosService } from './depoimentos.service';
import { DepoimentosController } from './depoimentos.controller';
import { depoimentoProviders } from './depoimentos.providers';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DepoimentosController],
  providers: [...depoimentoProviders, DepoimentosService],
})
export class DepoimentosModule {}
