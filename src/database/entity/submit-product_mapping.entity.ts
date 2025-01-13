import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { SubmitProduct } from './submit-product.entity';
import { SubmitShop } from './submit-shop.entity';

@Entity('submit_product_mapping')
export class SubmitProductMapping {
  @PrimaryColumn({ type: 'int' })
  submitProductId: number;

  @PrimaryColumn({ type: 'int' })
  submitShopId: number;

  @ManyToOne(() => SubmitProduct, { onDelete: 'CASCADE' })
  submitProduct: SubmitProduct;

  @ManyToOne(() => SubmitShop, { onDelete: 'CASCADE' })
  submitShop: SubmitShop;
}
