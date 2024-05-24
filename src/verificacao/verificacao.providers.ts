import { Verificacao } from 'src/core/entities/Verificacao.entity';
import { DataSource } from 'typeorm';

// Criação do repositório dos Depoimentos/Histórias
export const verificacaoProviders = [
  {
    provide: 'VERIFICACAO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Verificacao),
    inject: ['DATA_SOURCE'],
  },
];
