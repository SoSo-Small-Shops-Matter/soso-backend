import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import * as fs from 'fs';
import { CustomValidationPipe } from './common/pipe/validationPipe.pipe';
import { setupSwagger } from './swagger/swagger';

const serverConfig = config.get('server');

async function bootstrap() {
  // SSL 인증서 로드 (절대 경로로 설정)
  const privateKey = fs.readFileSync('/opt/bitnami/letsencrypt/certificates/testhttpsserver.store.key', 'utf8');
  const certificate = fs.readFileSync('/opt/bitnami/letsencrypt/certificates/testhttpsserver.store.crt', 'utf8');
  const ca = fs.readFileSync('/opt/bitnami/letsencrypt/certificates/testhttpsserver.store.issuer.crt', 'utf8');
  
  const httpsOptions = {
      key: privateKey,
      cert: certificate,
      ca: ca
  };

  // NestJS에서 HTTPS 적용
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.useGlobalPipes(new CustomValidationPipe());

  app.enableCors({
    origin: [
      'https://soso-client-soso-web.vercel.app',
      'http://127.0.0.1:5500',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  setupSwagger(app);

  // HTTPS 포트 443 사용
  await app.listen(serverConfig.port ?? 443);
}

bootstrap();
