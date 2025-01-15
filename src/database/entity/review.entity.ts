import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Column,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { User } from './user.entity';
import { Shop } from './shop.entity';
import { Image } from './image.entity';

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn()
    id: number; // 고유 ID

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    user: User; 

    @ManyToOne(() => Shop, (shop) => shop.reviews, { onDelete: 'CASCADE' })
    shop: Shop; 

    @ManyToMany(() => Image, (image) => image.reviews, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'image_mapping'
    })
    images: Image[];

    @CreateDateColumn()
    createdAt: Date; 
}
