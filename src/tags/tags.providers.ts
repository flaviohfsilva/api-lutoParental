import { Tags } from 'src/core/entities/Tags';
import { DataSource } from 'typeorm';

// Criação do repositório das Tags
export const tagsProviders = [
  {
    provide: 'TAGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tags),
    inject: ['DATA_SOURCE'],
  },
];
