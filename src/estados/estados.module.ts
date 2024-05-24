import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { estadosProviders } from './estados.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EstadosController],
  providers: [...estadosProviders, EstadosService],
  exports: [...estadosProviders, EstadosService],
})
export class EstadosModule {}
