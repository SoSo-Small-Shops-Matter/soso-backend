import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { UserRepository } from '../user/user.repository';

const jwtConfig = config.get('jwt');

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async findUserById(uuid: string) {
    return await this.userRepository.findUserByUUID(uuid);
  }
  async googleUserSignup(uuid: string, photoUrl: string, nickName: string) {
    return await this.userRepository.createUser(uuid, photoUrl, nickName);
  }

  async refresh(refresh_token: string) {
    try {
      // ✅ refresh_token 검증
      const payload = jwt.verify(refresh_token, jwtConfig.refresh_token_secret) as { uuid: string };

      // ✅ 새로운 access_token 발급 (payload에서 uuid를 올바르게 추출)
      const newAccessToken = jwt.sign(
        { uuid: payload.uuid }, // ✅ 여기서 payload.uuid만 넣어야 함!
        jwtConfig.access_token_secret,
        { expiresIn: jwtConfig.access_token_expiresIn },
      );

      return { access_token: newAccessToken };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(`유효하지 않은 refresh 토큰: ${error.message}`);
    }
  }
}
