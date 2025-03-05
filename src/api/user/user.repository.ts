import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
      console.error('Error find user By Id:', err); // 에러 로그 추가
      throw new InternalServerErrorException();
    }
  }
  async findUserByNickName(nickName: string) {
    try {
      return await this.userRepository.findOne({ where: { nickName } });
    } catch (err) {
      console.error('Error findUserNickname :', err); // 에러 로그 추가
      throw new InternalServerErrorException();
    }
  }
  async createUser(uuid: string, photoUrl: string, nickName: string, email: string) {
    try {
      return await this.userRepository.save({
        uuid,
        photoUrl,
        nickName,
        email,
      });
    } catch (err) {
      console.error('Error create user:', err); // 에러 로그 추가
      throw new InternalServerErrorException('User signup failed');
    }
  }
  async updateNickName(uuid: string, nickName: string) {
    try {
      return await this.userRepository.update({ uuid }, { nickName, isNew: false });
    } catch (err) {
      console.error('Error updateNickName :', err); // 에러 로그 추가
      throw new InternalServerErrorException();
    }
  }
  async updateUserPhotoUrl(uuid: string, photoUrl: string) {
    try {
      return await this.userRepository.update({ uuid }, { photoUrl });
    } catch (err) {
      console.error('Error setNickName :', err); // 에러 로그 추가
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(user: User) {
    try {
      return await this.userRepository.softRemove(user);
    } catch (err) {
      console.error('Error deleting user:', err);
      throw new InternalServerErrorException();
    }
  }

  async saveUser(user: User) {
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      console.error('Error save user:', err);
      throw new InternalServerErrorException();
    }
  }
}
