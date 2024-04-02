import { Module } from '@nestjs/common';
import { DireitosService } from './direitos.service';
import { DireitosController } from './direitos.controller';
import { direitosProviders } from './direitos.providers';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DireitosController],
  providers: [...direitosProviders, DireitosService],
})
export class DireitosModule {}
