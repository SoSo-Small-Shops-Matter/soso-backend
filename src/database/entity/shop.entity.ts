import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { OperatingHours } from './operating-hours.entity';
import { Review } from './review.entity';
import { Region } from './region.entity';

@Entity('shop')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500, default: null })
  image: string;

  @Column({ type: 'int', default: 0 }) // 0: 검증된 shop , 1: 사용자 제보하기로 생성된 shop
  type: number;

  @Column({ type: 'int', default: 0 }) // 0: 정상 1: 더이상 운영하지 않는 가게 2: 위치가 잘못됨
  reportStatus: number;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'float' })
  lng: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @ManyToMany(() => Product, (product) => product.shops)
  products: Product[];

  @OneToMany(() => OperatingHours, (operatingHours) => operatingHours.shop)
  operatingHours: OperatingHours[];

  @OneToMany(() => Review, (review) => review.shop)
  reviews: [Review];

  @ManyToOne(() => Region, (region) => region.shop)
  @JoinColumn()
  region: Region;
}
