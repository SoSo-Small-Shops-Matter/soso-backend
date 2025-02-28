import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import * as qs from 'querystring';
import { UserRepository } from '../user/user.repository';
import axios from 'axios';

const jwtConfig = config.get('jwt');
const googleConfig = config.get('google');

@Injectable()
export class AuthService {
  private googleTokenUrl = 'https://oauth2.googleapis.com/token';
  private googleUserInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

  constructor(private userRepository: UserRepository) {}

  async findUserById(uuid: string) {
    return await this.userRepository.findUserByUUID(uuid);
  }
  async googleUserSignup(uuid: string, photoUrl: string, nickName: string, email: string) {
    return await this.userRepository.createUser(uuid, photoUrl, nickName, email);
  }

  async getUserData(authCode: string, redirectUri: string) {
    if (!authCode || !redirectUri) throw new BadRequestException('code 또는 redirectUri 데이터가 없습니다.');

    const tokenResponse = await axios.post(
      this.googleTokenUrl,
      qs.stringify({
        code: authCode,
        client_id: googleConfig.CLIENT_ID,
        client_secret: googleConfig.CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    const { access_token } = tokenResponse.data;

    // 2️⃣ Access Token을 이용해 사용자 정보 요청
    const userResponse = await axios.get(this.googleUserInfoUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userData = userResponse.data;
    const existUser = await this.findUserById(userData.id);
    if (!existUser) {
      await this.googleUserSignup(userData.id, userData.picture, userData.name, userData.email);
    }

    const accessToken = jwt.sign({ uuid: userData.id }, jwtConfig.access_token_secret, { expiresIn: jwtConfig.access_token_expiresIn });

    const refreshToken = jwt.sign({ uuid: userData.id }, jwtConfig.refresh_token_secret, { expiresIn: jwtConfig.refresh_token_expiresIn });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      if (!refreshToken) throw new UnauthorizedException('헤더에 Refresh Token이 포함되지 않았습니다.');

      // ✅ refresh_token 검증
      const payload = jwt.verify(refreshToken, jwtConfig.refresh_token_secret) as { uuid: string };

      // ✅ 새로운 access_token 발급 (payload에서 uuid를 올바르게 추출)
      const newAccessToken = jwt.sign(
        { uuid: payload.uuid }, // ✅ 여기서 payload.uuid만 넣어야 함!
        jwtConfig.access_token_secret,
        { expiresIn: jwtConfig.access_token_expiresIn },
      );

      const newRefreshToken = jwt.sign(
        { uuid: payload.uuid }, // ✅ 여기서 payload.uuid만 넣어야 함!
        jwtConfig.refresh_token_secret,
        { expiresIn: jwtConfig.refresh_token_expiresIn },
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(`유효하지 않은 refresh 토큰: ${error.message}`);
    }
  }

  async test() {
    const accessToken = jwt.sign(
      { uuid: '102784937796556996262' }, // ✅ 여기서 payload.uuid만 넣어야 함!
      jwtConfig.access_token_secret,
      { expiresIn: '24h' },
    );
    return accessToken;
  }
}
