import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../database/entity/user.entity';
import { Repository } from 'typeorm';
import * as config from 'config';
import { LoggerService } from '../logger/logger.service';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly loggerService: LoggerService,
  ) {
    super({
      secretOrKey: jwtConfig.access_token_secret,
      ignoreExpiration: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { uuid, exp } = payload;
    if (exp && Date.now() >= exp * 1000) {
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }

    const user: User = await this.userRepository.findOne({ where: { uuid, deletedAt: null } });
    if (!user) {
      this.loggerService.warn(`JWT/ 존재하지 않은 유저 로그인 : ${uuid}`);
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    return user;
  }
}
