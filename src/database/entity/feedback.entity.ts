import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

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

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // 업데이트 시간 자동 갱신

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null; // 소프트 삭제 시간 (Soft Delete)
}
