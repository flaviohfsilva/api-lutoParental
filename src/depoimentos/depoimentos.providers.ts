<<<<<<< HEAD
import { Depoimentos } from 'src/core/entities/Depoimentos.entity';
=======
import { Depoimentos } from 'src/core/entities/Depoimentos';
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64
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
