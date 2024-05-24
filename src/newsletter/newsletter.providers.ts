import { Newslatter } from 'src/core/entities/Newslatter.entity';
import { DataSource } from 'typeorm';

// Criação do repositório dos Depoimentos/Histórias
export const newsletterProviders = [
  {
    provide: 'NEWSLETTER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Newslatter),
    inject: ['DATA_SOURCE'],
  },
];
