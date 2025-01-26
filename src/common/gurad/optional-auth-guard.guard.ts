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
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            request.user = null; // 인증되지 않은 사용자
            return true;
        }

        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, jwtConfig.secret); // JWT_SECRET 환경 변수 필요
            request.user = decoded; // 디코딩된 사용자 정보
        } catch (err) {
            console.log(err);
            request.user = null; // 인증 실패한 경우
        }

        return true; // 요청을 계속 진행
    }
}
