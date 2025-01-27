import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shop } from './shop.entity';

@Entity('region')
export class Region {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany( () => Shop, (shop) => shop.region)
    shop: Shop;
}
