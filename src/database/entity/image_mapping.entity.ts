import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Review } from './review.entity';
import { Image } from './image.entity';

@Entity('image_mapping')
export class ImageMapping {
  @PrimaryColumn({ type: 'int' })
  imageId: number;

  @PrimaryColumn({ type: 'int' })
  reviewId: number;

  @ManyToOne(() => Review, { onDelete: 'CASCADE' })
  review: Review;

  @ManyToOne(() => Image, { onDelete: 'CASCADE' })
  image: Image;
}
