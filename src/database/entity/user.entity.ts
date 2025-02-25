import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { Review } from './review.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  email: string;

  @Column({ default: '' })
  photoUrl: string;

  @Column({
    unique: true,
    nullable: true,
  })
  nickName: string;

  @Column({ default: true })
  isNew: boolean;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist[]; // 사용자가 소유한 위시리스트 목록

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[]; // 사용자가 소유한 위시리스트 목록
}
