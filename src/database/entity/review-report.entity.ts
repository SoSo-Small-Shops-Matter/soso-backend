import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('review_report')
export class ReviewReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  reviewId: number;

  // 0. 관련 없는 후기입니다. 1. 음란, 욕설 등 부적절한 내용입니다 2. 개인정보를 노출했습니다. 3. 홍보 및 광고 후기입니다. 4. 같은 내용을 도배하였습니다. 5. 기타
  @Column()
  status: number;

  @Column({ default: null }) // status가 기타(5)일 경우 message가 들어감
  message: string;
}
