import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: 'src/data/listAppDB',
    entities: [],
    synchronize: false,
    migrations: ['src/data/migrations/*.ts'],
    migrationsTableName: 'migrations_listApp',
  }),
);
