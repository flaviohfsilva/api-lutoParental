import { Direitos } from 'src/core/entities/Direitos';
import { DataSource } from 'typeorm';

// Criação do repositório das Direitos
export const direitosProviders = [
  {
    provide: 'DIREITOS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Direitos),
    inject: ['DATA_SOURCE'],
  },
];
