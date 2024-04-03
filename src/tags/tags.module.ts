import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { tagsProviders } from './tags.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [...tagsProviders, TagsService],
})
export class TagsModule {}

