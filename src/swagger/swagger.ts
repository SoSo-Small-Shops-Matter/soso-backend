import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('SoSo 프로젝트 API 문서')
    .setDescription('SoSo 프로젝트 서비스에 관련된 문서입니다.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('/v1/api')
    .build();

  // SwaggerModule.createDocument를 사용해 직접 병합
  const document = SwaggerModule.createDocument(app, config);

  // ✅ SwaggerModule.setup에 올바른 타입의 document 전달
  SwaggerModule.setup('api-docs', app, document);
}
