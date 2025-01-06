import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { SubmitShop } from './submit-shop.entity';

@Entity('submit_product')
export class SubmitProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToMany(() => SubmitShop, (submitShop) => submitShop.submitProducts)
    @JoinTable({ name: 'submit_product_mapping' })
    submitShops: SubmitShop[];
}
