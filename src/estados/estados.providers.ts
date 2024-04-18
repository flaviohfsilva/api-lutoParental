import { Estado } from 'src/core/entities/Estado.entity';
import { DataSource } from 'typeorm';

// Criação do repositório dos Direitos
export const estadosProviders = [
  {
    provide: 'ESTADOS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Estado),
    inject: ['DATA_SOURCE'],
  },
];
