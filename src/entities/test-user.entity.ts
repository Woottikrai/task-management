import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('testuser')
export class TestUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  email: string;
}
