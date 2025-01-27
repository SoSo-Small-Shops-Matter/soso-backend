import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { SubmitOperatingHours } from './submit-operating-hours.entity';
import { SubmitProduct } from './submit-product.entity';
import { Region } from './region.entity';

@Entity('submit_shop')
export class SubmitShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' ,default: false })
  existShop: boolean;

  @Column({ type: 'varchar', length: 255 , nullable: true })
  name: string;

  @Column({ type: 'float', nullable: true  })
  lat: number;

  @Column({ type: 'float', nullable: true  }) 
  lng: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @ManyToMany(() => SubmitProduct, (submitProduct) => submitProduct.submitShops)
  submitProducts: SubmitProduct[];

  @OneToMany(() => SubmitOperatingHours, (submitOperatingHours) => submitOperatingHours.submitShop)
  submitOperatingHours: SubmitOperatingHours[];

  @ManyToOne (() => Region, (region) => region.shop)
  @JoinColumn()
  region: Region;
}
