import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../logger/logger.service';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private loggerService: LoggerService,
  ) {}

  async findUserByUUID(uuid: string) {
    try {
      return await this.userRepository.findOne({
        where: {
          uuid: uuid,
          deletedAt: null,
        },
      });
    } catch (err) {
      this.loggerService.warn(`User/ findUserByUUID Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
  async findUserByNickName(nickName: string) {
    try {
      return await this.userRepository.findOne({ where: { nickName } });
    } catch (err) {
      this.loggerService.warn(`User/ findUserByNickName Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
  async createUser(uuid: string, photoUrl: string, email: string) {
    try {
      return await this.userRepository.save({
        uuid,
        photoUrl,
        email,
      });
    } catch (err) {
      this.loggerService.warn(`User/ createUser Error: ${err}`);
      throw new InternalServerErrorException('User signup failed');
    }
  }
  async updateNickName(uuid: string, nickName: string) {
    try {
      return await this.userRepository.update({ uuid }, { nickName, isNew: false });
    } catch (err) {
      this.loggerService.warn(`User/ updateNickName Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
  async updateUserPhotoUrl(uuid: string, photoUrl: string) {
    try {
      return await this.userRepository.update({ uuid }, { photoUrl });
    } catch (err) {
      this.loggerService.warn(`User/  updateUserPhotoUrl Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
