import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { Review } from './review.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: '', nullable: true })
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // 생성 시간 자동 저장

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // 업데이트 시간 자동 갱신

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null; // 소프트 삭제 시간 (Soft Delete)

  @Column({ nullable: true })
  deleteType: number; // 0:앱을 자주 사용 ~...
}
