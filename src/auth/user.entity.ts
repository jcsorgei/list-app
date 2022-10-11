import { IsString, Length } from 'class-validator';
import { List } from '../lists/list.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(5)
  @IsString()
  username: string;

  @Column()
  @Length(8)
  @IsString()
  password: string;

  @ManyToMany(() => List, (list) => list.assignedUsers)
  lists: List[];
}
