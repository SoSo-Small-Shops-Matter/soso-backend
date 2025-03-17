import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => Product, (product) => product.productMappings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' }) // productId를 Product의 id와 연결
  product: Product;

  @ManyToOne(() => Shop, (shop) => shop.productMappings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shopId' }) // shopId를 Shop의 id와 연결
  shop: Shop;
}
