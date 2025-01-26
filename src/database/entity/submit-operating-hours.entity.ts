import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SubmitShop } from './submit-shop.entity';

@Entity('submit_operating_hours')
export class SubmitOperatingHours {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ type: 'boolean', nullable: true, default: false })
    monday: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    tuesday: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    wednesday: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    thursday: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    friday: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    saturday: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    sunday: boolean;

    @Column({ type: 'time', nullable: true })
    time: string;

    @ManyToOne(() => SubmitShop, (submitShop) => submitShop.submitOperatingHours, { onDelete: 'CASCADE' })
    submitShop: SubmitShop;

}
