import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Shop } from './shop.entity';

@Entity('wishlist')
@Unique(['user', 'shop']) // 한 사용자가 같은 상점을 중복으로 추가하지 못하도록 설정
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number; // 고유 ID

    @ManyToOne(() => User, (user) => user.wishlists, { onDelete: 'CASCADE' })
    user: User; // 위시리스트를 소유한 사용자

    @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
    shop: Shop; // 위시리스트에 포함된 상점

    @CreateDateColumn()
    createdAt: Date; // 위시리스트 추가 시간

    @UpdateDateColumn()
    updatedAt: Date; // 위시리스트 업데이트 시간
}
