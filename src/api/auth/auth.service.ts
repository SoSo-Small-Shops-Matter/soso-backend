import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import * as qs from 'querystring';
import { UserRepository } from '../user/user.repository';
import axios from 'axios';
import { LoggerService } from '../logger/logger.service';
import { GoogleAuthLoginDTO, RefreshTokenDTO } from './dto/auth.dto';

const jwtConfig = config.get('jwt');
const googleConfig = config.get('google');

@Injectable()
export class AuthService {
  private googleTokenUrl = 'https://oauth2.googleapis.com/token';
  private googleUserInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

  constructor(
    private userRepository: UserRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async googleAuthLogin(googleAuthLoginDTO: GoogleAuthLoginDTO) {
    try {
      const { code, redirectUri } = googleAuthLoginDTO;
      if (!code || !redirectUri) throw new BadRequestException('code 또는 redirectUri 데이터가 없습니다.');

      const tokenResponse = await axios.post(
        this.googleTokenUrl,
        qs.stringify({
          code: code,
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
      const existUser = await this.userRepository.findUserByUUID(userData.id);
      if (!existUser) {
        await this.userRepository.createUser(userData.id, userData.picture, userData.name, userData.email);
      }

      const accessToken = jwt.sign({ uuid: userData.id }, jwtConfig.access_token_secret, { expiresIn: jwtConfig.access_token_expiresIn });
      const refreshToken = jwt.sign({ uuid: userData.id }, jwtConfig.refresh_token_secret, { expiresIn: jwtConfig.refresh_token_expiresIn });

      return { accessToken, refreshToken };
    } catch (err) {
      this.loggerService.warn(`Auth/ GoogleAuthLogin Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async refresh(refreshTokenDTO: RefreshTokenDTO) {
    const { refreshToken } = refreshTokenDTO;
    try {
      if (!refreshToken) throw new UnauthorizedException('헤더에 Refresh Token이 포함되지 않았습니다.');

      // ✅ refresh_token 검증
      const payload = jwt.verify(refreshToken, jwtConfig.refresh_token_secret) as { uuid: string };

      // ✅ 새로운 access_token 발급 (payload에서 uuid를 올바르게 추출)
      const newAccessToken = jwt.sign({ uuid: payload.uuid }, jwtConfig.access_token_secret, { expiresIn: jwtConfig.access_token_expiresIn });
      const newRefreshToken = jwt.sign({ uuid: payload.uuid }, jwtConfig.refresh_token_secret, { expiresIn: jwtConfig.refresh_token_expiresIn });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
      this.loggerService.warn(`Auth/ Refresh Error: ${err}`);
      throw new UnauthorizedException(`유효하지 않은 refresh 토큰: ${err.message}`);
    }
  }

  async test() {
    const accessToken = jwt.sign({ uuid: '102784937796556996262' }, jwtConfig.access_token_secret, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ uuid: '102784937796556996262' }, jwtConfig.refresh_token_secret, {
      expiresIn: jwtConfig.refresh_token_expiresIn,
    });
    return { accessToken, refreshToken };
  }
}
