import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user-parental',
        password: 'Lut0P@reNt@l',
        database: 'lutoparental',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      // Lut0P@reNt@l

      return dataSource.initialize();
    },
  },
];
