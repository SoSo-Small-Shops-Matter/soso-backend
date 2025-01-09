import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, Double } from 'typeorm';
import { SubmitOperatingHours } from './submit-operating-hours.entity';
import { SubmitProduct } from './submit-product.entity';

@Entity('submit_shop')
export class SubmitShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 , nullable: true })
  name: string;

  @Column({ type: 'int', default: false })
  reportStatus: number;

  @Column({ type: 'float', nullable: true  })
  lat: number;

  @Column({ type: 'float', nullable: true  }) 
  lng: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @ManyToMany(() => SubmitProduct, (submitProduct) => submitProduct.submitShops)
  submitProducts: Promise<SubmitProduct[]>;

  @OneToMany(() => SubmitOperatingHours, (submitOperatingHours) => submitOperatingHours.submitShop)
  submitOperatingHours: Promise<SubmitOperatingHours[]>;
}
