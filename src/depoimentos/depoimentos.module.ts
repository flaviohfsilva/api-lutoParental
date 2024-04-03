import { Module } from '@nestjs/common';
import { DepoimentosService } from './depoimentos.service';
import { DepoimentosController } from './depoimentos.controller';
import { depoimentoProviders } from './depoimentos.providers';
<<<<<<< HEAD
import { DatabaseModule } from 'src/database/database.module';
=======
import { DatabaseModule } from 'src/core/database/database.module';
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64

@Module({
  imports: [DatabaseModule],
  controllers: [DepoimentosController],
  providers: [...depoimentoProviders, DepoimentosService],
})
export class DepoimentosModule {}
