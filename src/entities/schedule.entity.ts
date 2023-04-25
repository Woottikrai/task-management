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
import { Exclude } from 'class-transformer';

export enum Option {
  Pay = 'Pay',
  Do = 'Do',
}

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.schedule, { cascade: true })
  user: User;

  @Column()
  @Exclude()
  userId: number;

  @ManyToOne(() => Calendar, (calendar) => calendar.schedule, { cascade: true })
  calendar: Calendar;

  @Column()
  @Exclude()
  calendarId: number;

  @Column()
  do_pay: string;

  @Column({ nullable: false })
  how_much: number;

  @CreateDateColumn()
  createAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @UpdateDateColumn()
  UpdateAt: Date;
}
