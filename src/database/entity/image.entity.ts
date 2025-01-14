import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity('image')
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToMany(() => Review, (review) => review.images)
    reviews: Review[];
}
