// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Review } from './review.entity';
//
// @Entity('review_report')
// export class ReviewReport {
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @Column()
//   user: string;
//
//   @Column() //
//   status: number;
//
//   @Column({ default: null }) // status가 기타일 경우 Text가 들어감
//   text: string;
//
//   @OneToMany(() => Review, (shop) => shop.id)
//   review: Review;
// }
