import { IsString, Length } from 'class-validator';
import { List } from '../lists/list.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => List, (list) => list.assignedUsers)
  lists: List[];
}
