import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('recent_search')
export class RecentSearch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  shopName: string;

  @Column()
  shopId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // 생성 시간 자동 저장
}
