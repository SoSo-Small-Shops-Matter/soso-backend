import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { CustomValidationPipe } from './common/pipe/validationPipe.pipe';
import { setupSwagger } from './swagger/swagger';

const serverConfig = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe());
  // CORS 활성화
  app.enableCors({
    origin: [
        'https://soso-client-soso-web.vercel.app',
        'http://127.0.0.1:5500',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
});
  setupSwagger(app);
  await app.listen(serverConfig.port ?? 3000);
}
bootstrap();
