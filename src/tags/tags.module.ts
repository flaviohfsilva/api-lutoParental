import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { tagsProviders } from './tags.providers';
<<<<<<< HEAD
import { DatabaseModule } from 'src/database/database.module';
=======
import { DatabaseModule } from 'src/core/database/database.module';
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [...tagsProviders, TagsService],
})
export class TagsModule {}
<<<<<<< HEAD

=======
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64
