export class SuccessResponseDTO {
    message: string;
    statusCode: number;
    result: any;

    constructor(result: any = null) {
        this.message = "Success"; // 기본 메시지 "Success"를 제공
        this.statusCode = 200;
        this.result = result
    } 
}

export class BadRequestResponseDTO {
    message: string;
    error: string
    statusCode: number;

    constructor(message: string = "Bad Request") {
        this.message = message;
        this.error = "Bad Request"
        this.statusCode = 400;
    }
}

// export class UnauthorizedResponseDTO {
//     isSuccess: false;
//     statusCode: number;
//     message: string;

//     constructor(message: string = "Unauthorized") {
//         this.isSuccess = false;
//         this.statusCode = 401;
//         this.message = message;
//     }
// }

// export class ForbiddenResponseDTO {
//     isSuccess: false;
//     statusCode: number;
//     message: string;

//     constructor(message: string = "Forbidden") {
//         this.isSuccess = false;
//         this.statusCode = 403;
//         this.message = message;
//     }
// }

// export class NotFoundResponseDTO {
//     isSuccess: false;
//     statusCode: number;
//     message: string;

//     constructor(message: string = "Not Found") {
//         this.isSuccess = false;
//         this.statusCode = 404;
//         this.message = message;
//     }
// }

// export class ConflictResponseDTO {
//     isSuccess: false;
//     statusCode: number;
//     message: string;

//     constructor(message: string = "Conflict") {
//         this.isSuccess = false;
//         this.statusCode = 409;
//         this.message = message;
//     }
// }

// export class InternalServerErrorResponseDTO {
//     isSuccess: false;
//     statusCode: number;
//     message: string;

//     constructor(message: string = "Internal Server Error") {
//         this.isSuccess = false;
//         this.statusCode = 500;
//         this.message = message;
//     }
// }