import { BadRequestException, ValidationError, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { BadRequestResponseDTO } from '../response/response.dto'; // DTO 경로

export class CustomValidationPipe extends ValidationPipe {
  constructor(options: ValidationPipeOptions = {}) {
    super({
      transform: true, // ← DTO의 @Type(() => Number) 동작
      whitelist: true, // ← DTO에 없는 필드는 자동 삭제
      // forbidNonWhitelisted: true, // ← DTO에 허용되지 않은 필드가 오면 요청 자체를 막음
      ...options,
    });
  }

  protected flattenValidationErrors(errors: ValidationError[]): string[] {
    return errors.map((error) => Object.values(error.constraints).join(', '));
  }

  createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      const errors = this.flattenValidationErrors(validationErrors);
      const message = errors.join('; ');
      return new BadRequestException(new BadRequestResponseDTO(message));
    };
  }
}
