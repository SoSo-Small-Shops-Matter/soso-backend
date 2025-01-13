import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shop } from './shop.entity';

@Entity('operating_hours')
export class OperatingHours {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    phoneNumber: string;
  
    @Column({ nullable: true })
    mondayHours: string;
  
    @Column({ nullable: true })
    tuesdayHours: string;
  
    @Column({ nullable: true })
    wednesdayHours: string;
  
    @Column({ nullable: true })
    thursdayHours: string;
  
    @Column({ nullable: true })
    fridayHours: string;
  
    @Column({ nullable: true })
    saturdayHours: string;
  
    @Column({ nullable: true })
    sundayHours: string;  
    
    @ManyToOne(() => Shop, (shop) => shop.operatingHours, { onDelete: 'CASCADE' })
    shop: Shop;

}
