import { Noticia } from 'src/core/entities/Noticia';
import { DataSource } from 'typeorm';

// Criação do repositório da Noticia
export const noticiaProviders = [
  {
    provide: 'NOTICIA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Noticia),
    inject: ['DATA_SOURCE'],
  },
];
