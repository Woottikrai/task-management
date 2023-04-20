import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Calendar } from './calendar.entity';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.schedule, { cascade: true })
  user: User;

  @ManyToOne(() => Calendar, (calendar) => calendar.schedule, { cascade: true })
  calendar: Calendar;

  @CreateDateColumn()
  createAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @UpdateDateColumn()
  UpdateAt: Date;
}
