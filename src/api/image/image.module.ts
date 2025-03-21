import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../../database/entity/image.entity';
import { ImageRepository } from './image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageRepository],
  exports: [ImageRepository],
})
export class ImageModule {}
