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

  async findUserSubmitUserRecord(uuid: string) {
    try {
      return await this.submitUserRecordRepository.find({
        where: {
          user: { uuid },
        },
        relations: ['shop'],
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findUserSubmitUserRecordByPageNation(uuid: string, page: number, limit: number) {
    try {
      return await this.submitUserRecordRepository
        .createQueryBuilder('submit') // ✅ 엔티티 별칭 수정
        .where('submit.user.uuid = :uuid', { uuid }) // ✅ where 절 수정
        .leftJoinAndSelect('submit.shop', 'shop') // ✅ shop 관계 조인
        .skip(limit * (page - 1)) // ✅ offset 설정
        .take(limit) // ✅ limit 설정
        .getMany();
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
