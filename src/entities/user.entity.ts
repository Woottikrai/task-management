import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Schedule } from './schedule.entity';
import { Position } from './position.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  img: string;

  @Column()
  tel: string;

  @ManyToOne(() => Position, (position) => position.user)
  position: Position;

  @Column()
  @Exclude()
  positionId: number;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedule: Schedule[];

  @CreateDateColumn()
  createAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @UpdateDateColumn()
  UpdateAt: Date;
}
