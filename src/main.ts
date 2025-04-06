import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { CustomValidationPipe } from './common/pipe/validationPipe.pipe';
import { setupSwagger } from './swagger/swagger';
import { LoggerService } from './api/logger/logger.service';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  const port = process.env.NODE_ENV == 'prd' ? 443 : 80;
  if (process.env.NODE_ENV === 'prd') {
    const httpsOptions = {
      key: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/testhttpsserver.store.key', 'utf8'),
      cert: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/testhttpsserver.store.crt', 'utf8'),
      ca: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/testhttpsserver.store.issuer.crt', 'utf8'),
    };

    // https 설정을 다시 반영한 앱 재생성
    app = await NestFactory.create(AppModule, { httpsOptions });
  }

  const logger = app.get(LoggerService);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.enableCors({
    origin: (origin, callback) => {
      // origin이 존재하지 않는 경우(null)도 허용 (서버 간 요청, Postman)
      if (!origin || true) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 인증 관련 요청 허용
  });
  setupSwagger(app);

  app.setGlobalPrefix('v1/api');
  // HTTPS 포트 443 사용
  await app.listen(port);
}

bootstrap();
