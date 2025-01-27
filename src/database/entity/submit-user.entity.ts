import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';
import { SubmitShop } from './submit-shop.entity';
import { User } from './user.entity';

@Entity('submit_user_record')
export class SubmitUserRecord {
  @PrimaryColumn()
  uuid: string;

  @PrimaryColumn({ type: 'int' })
  submitShopId: number;

  @Column({type: 'int'}) // 0: 최초 제보  1: 운영 정보 수정 2: 판매 정보 수정 
  type: number;

  @Column({type: 'int', default: 0}) // 0: 확인 중 1: 승인 2: 거절 
  status: number;

  @Column({ default: null }) // 거절시 메시지 
  rejectMessage: string; 

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => SubmitShop, { onDelete: 'CASCADE' })
  submitShop: SubmitShop;
}
