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

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.lists)
  @JoinTable()
  assignedUsers: User[];

  @OneToMany(() => ListItem, (listItem) => listItem.list, { cascade: true })
  items: ListItem[];
}
