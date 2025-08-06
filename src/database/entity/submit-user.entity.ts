import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Shop } from './shop.entity';

@Entity('submit_user_record')
export class SubmitUserRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' }) // 0: 최초 제보  1: 운영 정보 수정 2: 판매 정보 수정
  type: number;

  @Column({ type: 'int', default: 0 }) // 0: 확인 중 1: 승인 2: 거절
  status: number;

  @Column({ default: null }) // 거절시 메시지
  rejectMessage: string;

  @Column({ default: null })
  operatingId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;

  @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
  shop: Shop;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
