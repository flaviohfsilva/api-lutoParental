import { Depoimentos } from 'src/core/entities/Depoimentos.entity';
import { DataSource } from 'typeorm';

// Criação do repositório dos Depoimentos/Histórias
export const depoimentoProviders = [
  {
    provide: 'DEPOIMENTOS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Depoimentos),
    inject: ['DATA_SOURCE'],
  },
];
