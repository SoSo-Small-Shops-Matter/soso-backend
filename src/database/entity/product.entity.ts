import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Shop } from './shop.entity';
import { ProductMapping } from './product_mapping.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Shop, (shop) => shop.products)
  @JoinTable({ name: 'product_mapping' })
  shops: Shop[];

  @OneToMany(() => ProductMapping, (productMapping) => productMapping.shop)
  productMappings: ProductMapping[];
}
