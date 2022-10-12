import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './list.entity';

export enum ItemStatus {
  Active = 1,
  Finished,
  Cancelled,
}

@Entity()
export class ListItem {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  freeText: string;

  @Column()
  @Expose()
  deadLine: Date;

  @Column()
  @Expose()
  creatorId: number;

  @Column({ enum: ItemStatus, default: ItemStatus.Active })
  @Expose()
  status: ItemStatus;

  @ManyToOne(() => List, (list) => list.items)
  list: List;
}
