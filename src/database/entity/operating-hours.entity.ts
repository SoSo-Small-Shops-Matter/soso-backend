import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shop } from './shop.entity';

@Entity('operating_hours')
export class OperatingHours {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ type: 'time', nullable: true })
    mondayStartHours: string;

    @Column({ type: 'time', nullable: true })
    mondayEndHours: string;

    @Column({ type: 'time', nullable: true })
    tuesdayStartHours: string;

    @Column({ type: 'time', nullable: true })
    tuesdayEndHours: string;

    @Column({ type: 'time', nullable: true })
    wednesdayStartHours: string;

    @Column({ type: 'time', nullable: true })
    wednesdayEndHours: string;

    @Column({ type: 'time', nullable: true })
    thursdayStartHours: string;

    @Column({ type: 'time', nullable: true })
    thursdayEndHours: string;

    @Column({ type: 'time', nullable: true })
    fridayStartHours: string;

    @Column({ type: 'time', nullable: true })
    fridayEndHours: string;

    @Column({ type: 'time', nullable: true })
    saturdayStartHours: string;

    @Column({ type: 'time', nullable: true })
    saturdayEndHours: string;

    @Column({ type: 'time', nullable: true })
    sundayStartHours: string;

    @Column({ type: 'time', nullable: true })
    sundayEndHours: string;

    @ManyToOne(() => Shop, (shop) => shop.operatingHours, { onDelete: 'CASCADE' })
    shop: Shop;
}
