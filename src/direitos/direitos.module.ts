import { Module } from '@nestjs/common';
import { DireitosService } from './direitos.service';
import { DireitosController } from './direitos.controller';

@Module({
  controllers: [DireitosController],
  providers: [DireitosService],
})
export class DireitosModule {}
