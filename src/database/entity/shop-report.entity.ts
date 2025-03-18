import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('shop_report')
export class ShopReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  shopId: number;

  @Column() //
  status: number;

  @Column({ default: null }) // status가 기타일 경우 Text가 들어감
  message: string;
}
