import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token; // ✅ 쿠키에서 access_token 가져오기

    if (!token) {
      request.user = null; // 인증되지 않은 사용자
      return true;
    }

    try {
      const decoded = jwt.verify(token, jwtConfig.access_token_secret); // ✅ 토큰 검증
      request.user = decoded; // ✅ 검증 성공 시 유저 정보 저장
    } catch (err) {
      console.log(err);
      request.user = null; // ✅ 인증 실패 시 null 처리
    }

    return true; // ✅ 요청 계속 진행
  }
}
