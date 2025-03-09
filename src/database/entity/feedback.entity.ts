import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  text: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // 생성 시간 자동 저장
}
