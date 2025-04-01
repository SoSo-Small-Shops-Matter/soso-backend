import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmitUserRecord } from 'src/database/entity/submit-user.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class SubmitRepository {
  constructor(
    @InjectRepository(SubmitUserRecord)
    private submitUserRecordRepository: Repository<SubmitUserRecord>,
    private readonly loggerService: LoggerService,
  ) {}

  async createSubmitUserRecordByNewShop(uuid, shopId) {
    try {
      return await this.submitUserRecordRepository.save({
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
      this.loggerService.warn(`Submit/ createSubmitUserRecordByNewShop Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async createSubmitUserRecordByUpdateOperatingInfo(uuid, shopId, newOperatingId: number) {
    try {
      return await this.submitUserRecordRepository.save({
        status: 0,
        type: 1,
        user: {
          uuid,
        },
        shop: {
          id: shopId,
        },
        operatingId: newOperatingId,
      });
    } catch (err) {
      this.loggerService.warn(`Submit/ createSubmitUserRecordByUpdateOperatingInfo Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async createSubmitUserRecordByUpdateProducts(uuid: string, shopId: number) {
    try {
      return await this.submitUserRecordRepository.save({
        status: 0,
        type: 2,
        user: {
          uuid,
        },
        shop: {
          id: shopId,
        },
      });
    } catch (err) {
      this.loggerService.warn(`Submit/ createSubmitUserRecordByUpdateProducts Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findUserSubmitRecordByType(uuid: string, shopId: number, type: number): Promise<SubmitUserRecord> {
    try {
      return await this.submitUserRecordRepository.findOne({
        where: {
          user: { uuid },
          shop: {
            id: shopId,
          },
          type,
          status: 0, // 확인중
        },
      });
    } catch (err) {
      this.loggerService.warn(`Submit/ findUserSubmitUserRecord Error: ${err}`);
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
      this.loggerService.warn(`Submit/ findUserSubmitUserRecord Error: ${err}`);
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
      this.loggerService.warn(`Submit/ findUserSubmitUserRecordByPageNation Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findAllSubmitProducts() {
    try {
      return await this.submitUserRecordRepository
        .createQueryBuilder('submit')
        .where('submit.type=2')
        .leftJoinAndSelect('submit.shop', 'shop') // ✅ shop 관계 조인
        .leftJoinAndSelect('shop.productMappings', 'productMappings')
        .leftJoinAndSelect('submit.user', 'user') // ✅ shop 관계 조인
        .getMany();
    } catch (err) {
      this.loggerService.warn(`Submit/ findAllSubmitProducts Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findAllSubmitOperatings() {
    try {
      return await this.submitUserRecordRepository
        .createQueryBuilder('submit')
        .where('submit.type=1')
        .leftJoinAndSelect('submit.shop', 'shop') // ✅ shop 관계 조인
        .leftJoinAndSelect('shop.operatingHours', 'operatingHours')
        .leftJoinAndSelect('submit.user', 'user') // ✅ shop 관계 조인
        .getMany();
    } catch (err) {
      this.loggerService.warn(`Submit/ findAllSubmitProducts Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findAllSubmitNewShops() {
    try {
      return await this.submitUserRecordRepository
        .createQueryBuilder('submit')
        .where('submit.type=0')
        .leftJoinAndSelect('submit.shop', 'shop') // ✅ shop 관계 조인
        .leftJoinAndSelect('shop.operatingHours', 'operatingHours')
        .leftJoinAndSelect('shop.productMappings', 'productMappings')
        .leftJoinAndSelect('submit.user', 'user') // ✅ shop 관계 조인
        .getMany();
    } catch (err) {
      this.loggerService.warn(`Submit/ findAllSubmitProducts Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findSubmitBySubmitIdAndType(submitId: number, type: number, userUUID: string) {
    try {
      return await this.submitUserRecordRepository.findOne({
        where: {
          id: submitId,
          status: 0,
          type: type,
          user: {
            uuid: userUUID,
          },
        },
      });
    } catch (err) {
      this.loggerService.warn(`Submit/ findSubmitProductsBySubmitId Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async saveSubmit(submit) {
    try {
      return await this.submitUserRecordRepository.save(submit);
    } catch (err) {
      this.loggerService.warn(`Submit/ saveSubmit Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async deleteSubmitUserByUUID(uuid: string) {
    try {
      return await this.submitUserRecordRepository.delete({
        user: {
          uuid,
        },
      });
    } catch (err) {
      this.loggerService.warn(`Submit/ deleteSubmitUserByUUID Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
