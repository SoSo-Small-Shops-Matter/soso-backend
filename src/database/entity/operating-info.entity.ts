import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shop } from './shop.entity';

@Entity('operating_hours')
export class OperatingHours {
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
    startTime: string;

    @Column({ type: 'time', nullable: true })
    endTime: string;

    @ManyToOne(() => Shop, (shop) => shop.operatingHours, { onDelete: 'CASCADE' })
    shop: Shop;
}