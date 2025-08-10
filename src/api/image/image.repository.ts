import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../../database/entity/image.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

export class ImageRepository {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private readonly loggerService: LoggerService,
  ) {}

  async deleteImage(imageId: number) {
    try {
      return await this.imageRepository.delete({ id: imageId });
    } catch (err) {
      this.loggerService.warn(`Review/ deleteImage Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async deleteImageByUrl(imageUrl: string) {
    try {
      return await this.imageRepository.delete({ url: imageUrl });
    } catch (err) {
      this.loggerService.warn(`Review/ deleteImage Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async createImage(url: string) {
    try {
      return this.imageRepository.create({
        url,
      });
    } catch (err) {
      this.loggerService.warn(`Review/ createImage Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async saveImage(image) {
    try {
      return await this.imageRepository.save(image);
    } catch (err) {
      this.loggerService.warn(`Review/ saveImage Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
}