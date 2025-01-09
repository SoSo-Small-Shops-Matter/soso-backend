import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, Double } from 'typeorm';
import { Product } from './product.entity';
import { OperatingHours } from './operating-hours.entity';
import { Review } from './review.entity';

@Entity('shop')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', default: false })
  reportStatus: number;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'float' }) 
  lng: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @ManyToMany(() => Product, (product) => product.shops)
  products: Promise<Product[]>;

  @OneToMany(() => OperatingHours, (operatingHours) => operatingHours.shop)
  operatingHours: Promise<OperatingHours[]>;

  @OneToMany(() => Review, (review) => review.shop)
  reviews: Promise<[Review]>;
}
