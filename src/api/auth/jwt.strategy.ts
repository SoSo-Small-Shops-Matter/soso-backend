import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../database/entity/user.entity';
import { Repository } from 'typeorm';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req && req.cookies) {
            const token = req.cookies['access_token'];
            if (!token) return null;

            try {
              // ✅ 토큰이 유효한지 검사 (만료 확인)
              jwt.verify(token, jwtConfig.secret);
            } catch (error) {
              if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('토큰이 만료되었습니다.');
              }
              throw new UnauthorizedException('유효하지 않은 토큰입니다.');
            }

            return token;
          }
          return null;
        },
      ]),
    });
  }

  async validate(payload: any) {
    const { uuid } = payload;
    const user: User = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
