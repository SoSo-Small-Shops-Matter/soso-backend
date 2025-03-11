import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './product.entity';
import { Shop } from './shop.entity';

@Entity('product_mapping')
export class ProductMapping {
  @PrimaryColumn({ type: 'int' })
  productId: number;

  @PrimaryColumn({ type: 'int' })
  shopId: number;

  @Column({ type: 'int', default: 0 })
  type: number; // 0: 실제 사용중 , 1: 제안

  @Column({ default: 'admin' })
  user: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
  shop: Shop;
}
