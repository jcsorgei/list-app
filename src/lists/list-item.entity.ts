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
  id: number;

  @Column()
  title: string;

  @Column()
  freeText: string;

  @Column()
  deadLine: Date;

  @Column()
  creatorId: number;

  @Column({ enum: ItemStatus, default: ItemStatus.Active })
  status: ItemStatus;

  @ManyToOne(() => List, (list) => list.items)
  list: List;
}
