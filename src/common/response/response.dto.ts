import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels() // 중요: Swagger에 제네릭 대상 등록
export class SuccessResponseDTO<T = any> {
  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ required: true })
  result: T;

  constructor(result: T = null) {
    this.message = 'Success';
    this.statusCode = 200;
    this.result = result;
  }
}

export class Success201ResponseDTO {
  @ApiProperty({ description: '응답 메시지', example: 'Success' })
  message: string;
  
  @ApiProperty({ description: 'HTTP 상태 코드', example: 201 })
  statusCode: number;
  
  @ApiProperty({ description: '응답 데이터', example: {} })
  result: any;

  constructor(result: any = null) {
    this.message = 'Success'; // 기본 메시지 "Success"를 제공
    this.statusCode = 201;
    if (result || result === false) this.result = result;
  }
}

export class BadRequestResponseDTO {
  @ApiProperty({ description: '에러 메시지', example: 'Bad Request' })
  message: string;
  
  @ApiProperty({ description: '에러 타입', example: 'Bad Request' })
  error: string;
  
  @ApiProperty({ description: 'HTTP 상태 코드', example: 400 })
  statusCode: number;

  constructor(message: string = 'Bad Request') {
    this.message = message;
    this.error = 'Bad Request';
    this.statusCode = 400;
  }
}
