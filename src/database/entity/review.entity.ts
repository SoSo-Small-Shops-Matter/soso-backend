import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Column,
} from 'typeorm';
import { User } from './user.entity';
import { Shop } from './shop.entity';

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn()
    id: number; // 고유 ID

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    user: User; // 위시리스트를 소유한 사용자

    @ManyToOne(() => Shop, (shop) => shop.reviews, { onDelete: 'CASCADE' })
    shop: Shop; 

    @CreateDateColumn()
    createdAt: Date; // 위시리스트 추가 시간
}
