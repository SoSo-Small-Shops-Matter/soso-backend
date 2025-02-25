import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmitUserRecord } from 'src/database/entity/submit-user.entity';

@Injectable()
export class SubmitRepository {
  constructor(
    @InjectRepository(SubmitUserRecord)
    private submitUserRecordRepository: Repository<SubmitUserRecord>,
  ) {}

  async createSubmitUserRecordByNewShop(uuid, shopId) {
    try {
      return await this.submitUserRecordRepository.save({
        uuid,
        shopId,
        status: 0,
        type: 0,
        user: {
          uuid,
        },
        shop: {
          id: shopId,
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async createSubmitUserRecordByUpdateOperatingInfo(uuid, shopId) {
    try {
      return await this.submitUserRecordRepository.save({
        uuid,
        shopId,
        status: 0,
        type: 1,
        user: {
          uuid,
        },
        shop: {
          id: shopId,
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async createSubmitUserRecordByUpdateProducts(uuid: string, shopId: number) {
    try {
      return await this.submitUserRecordRepository.save({
        uuid,
        shopId,
        status: 1,
        type: 2,
        user: {
          uuid,
        },
        shop: {
          id: shopId,
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findSubmitUserRecord(uuid: string) {
    try {
      return await this.submitUserRecordRepository.find({
        where: {
          uuid,
        },
        relations: ['shop'],
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
