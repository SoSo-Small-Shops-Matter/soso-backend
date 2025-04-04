import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import * as fs from 'fs';
import { CustomValidationPipe } from './common/pipe/validationPipe.pipe';
import { setupSwagger } from './swagger/swagger';
import { LoggerService } from './api/logger/logger.service';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
// import { SanitizePipe } from './common/pipe/sanitize.pipe';

const serverConfig = config.get('server');

async function bootstrap() {
  let app;
  const port = process.env.NODE_ENV == 'prd' ? serverConfig.port : 80;
  if (process.env.NODE_ENV === 'prd') {
    // SSL 인증서 로드 (절대 경로로 설정)
    const privateKey = fs.readFileSync('/opt/bitnami/letsencrypt/certificates/testhttpsserver.store.key', 'utf8');
    const certificate = fs.readFileSync('/opt/bitnami/letsencrypt/certificates/testhttpsserver.store.crt', 'utf8');
    const ca = fs.readFileSync('/opt/bitnami/letsencrypt/certificates/testhttpsserver.store.issuer.crt', 'utf8');

    const httpsOptions = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };

    // NestJS에서 HTTPS 적용
    app = await NestFactory.create(AppModule, { httpsOptions });
  } else {
    // 개발모드
    app = await NestFactory.create(AppModule);
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
