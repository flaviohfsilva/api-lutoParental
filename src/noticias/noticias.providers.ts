<<<<<<< HEAD
import { Noticia } from 'src/core/entities/Noticia.entity';
=======
import { Noticia } from 'src/core/entities/Noticia';
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64
import { DataSource } from 'typeorm';

// Criação do repositório da Noticia
export const noticiaProviders = [
  {
    provide: 'NOTICIA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Noticia),
    inject: ['DATA_SOURCE'],
  },
];
