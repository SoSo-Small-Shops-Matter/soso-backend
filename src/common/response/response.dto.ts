export class SuccessResponseDTO {
  message: string;
  statusCode: number;
  result: any;

  constructor(result: any = null) {
    this.message = 'Success'; // 기본 메시지 "Success"를 제공
    this.statusCode = 200;
    if (result || result === false) this.result = result;
  }
}
export class Success201ResponseDTO {
  message: string;
  statusCode: number;
  result: any;

  constructor(result: any = null) {
    this.message = 'Success'; // 기본 메시지 "Success"를 제공
    this.statusCode = 201;
    if (result || result === false) this.result = result;
  }
}

export class Success204ResponseDTO {
  message: string;
  statusCode: number;
  result: any;

  constructor(result: any = null) {
    this.message = 'Success'; // 기본 메시지 "Success"를 제공
    this.statusCode = 204;
    if (result || result === false) this.result = result;
  }
}

export class BadRequestResponseDTO {
  message: string;
  error: string;
  statusCode: number;

  constructor(message: string = 'Bad Request') {
    this.message = message;
    this.error = 'Bad Request';
    this.statusCode = 400;
  }
}
