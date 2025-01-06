import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SubmitShop } from './submit-shop.entity';

@Entity('submit_operating_hours')
export class SubmitOperatingHours {
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
    
    @ManyToOne(() => SubmitShop, (submitShop) => submitShop.submitOperatingHours, { onDelete: 'CASCADE' })
    submitShop: SubmitShop;

}
