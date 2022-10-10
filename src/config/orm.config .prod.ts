import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { DataSource } from 'typeorm';

export const typeOrmModuleOptionsProd: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'src/data/listAppDB.db',
  entities: [User],
  synchronize: false,
};
const dataSource = new DataSource({
  type: 'sqlite',
  database: 'src/data/listAppDB.db',
  entities: [User],
  synchronize: false,
  migrations: ['src/data/migrations/*.ts'],
  migrationsTableName: 'migrations_listApp',
});

export default dataSource;
