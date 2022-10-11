import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { DataSource } from 'typeorm';
import { List } from '../lists/list.entity';
import { ListItem } from '../lists/list-item.entity';

export const typeOrmModuleOptionsProd: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'src/data/listAppDB.db',
  entities: [User, List, ListItem],
  synchronize: false,
};
const dataSource = new DataSource({
  type: 'sqlite',
  database: 'src/data/listAppDB.db',
  entities: [User, List, ListItem],
  synchronize: false,
  migrations: ['src/data/migrations/*.ts'],
  migrationsTableName: 'migrations_listApp',
});

export default dataSource;
