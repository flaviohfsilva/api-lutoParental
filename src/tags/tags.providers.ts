<<<<<<< HEAD
import { Tags } from 'src/core/entities/Tags.entity';
=======
import { Tags } from 'src/core/entities/Tags';
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64
import { DataSource } from 'typeorm';

// Criação do repositório das Tags
export const tagsProviders = [
  {
<<<<<<< HEAD
    provide: 'TAG_REPOSITORY',
=======
    provide: 'TAGS_REPOSITORY',
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tags),
    inject: ['DATA_SOURCE'],
  },
];
