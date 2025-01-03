import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shop } from './shop.entity';

@Entity('operating_hours')
export class OperatingHours {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Shop, (shop) => shop.operatingHours, { onDelete: 'CASCADE' })
    shop: Shop;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    mondayHours: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    tuesdayHours: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    wednesdayHours: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    thursdayHours: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    fridayHours: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    saturdayHours: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    sundayHours: string;
}
