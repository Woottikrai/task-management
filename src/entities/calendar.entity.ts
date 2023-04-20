import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('calendar')
export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.calendar)
  schedule: Schedule[];
}
