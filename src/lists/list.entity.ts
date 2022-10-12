import { User } from '../auth/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListItem } from './list-item.entity';
import { Expose } from 'class-transformer';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ nullable: false, unique: true })
  @Expose()
  name: string;

  @ManyToMany(() => User, (user) => user.lists)
  @JoinTable()
  assignedUsers: User[];

  @OneToMany(() => ListItem, (listItem) => listItem.list, { cascade: true })
  @Expose()
  items: ListItem[];
}
