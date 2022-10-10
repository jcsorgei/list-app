import { IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
