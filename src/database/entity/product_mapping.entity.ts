import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Shop } from './shop.entity';

@Entity('product_mapping')
export class ProductMapping {
  @PrimaryColumn({ type: 'int' })
  productId: number;

  @PrimaryColumn({ type: 'int' })
  shopId: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
  shop: Shop;
}
