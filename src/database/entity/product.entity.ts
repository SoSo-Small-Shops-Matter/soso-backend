import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Shop } from './shop.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Shop, (shop) => shop.products)
  @JoinTable({ name: 'product_mapping' })
  shops: Shop[];
}
