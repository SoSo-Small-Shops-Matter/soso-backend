export const userSwaggerDocs = {
  saveUserNickName: {
    summary: '사용자 닉네임 저장',
    description: '회원가입 후 사용자의 닉네임을 저장합니다.',
    requestBody: {
      description: '사용자 닉네임',
      required: true,
      content: {
        'application/json': {
          example: {
            nickName: "nickname",
          },
        },
      },
    },
    responses: {
      200: {
        description: '닉네임 저장 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: 'Bad Request',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
      401: {
        description: '인증 실패',
        content: {
          'application/json': {
            example: {
              message: 'Unauthorized',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
      409: {
        description: '존재하는 닉네임',
        content: {
          'application/json': {
            example: {
              message: 'Conflict',
              error: 'Conflict',
              statusCode: 404,
            },
          },
        },
      },
      500: {
        description: '내부 서버 오류',
        content: {
          'application/json': {
            example: {
              message: 'Failed to save user case',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  updateUserNickName: {
    summary: '사용자 닉네임 업데이트',
    description: '사용자 닉네임 업데이트',
    responses: {
      200: {
        description: '닉네임 업데이트 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: 'Bad Request',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
      401: {
        description: '인증 실패',
        content: {
          'application/json': {
            example: {
              message: 'Unauthorized',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      },
      409: {
        description: '존재하는 닉네임',
        content: {
          'application/json': {
            example: {
              message: 'Not Found',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      },
      500: {
        description: '내부 서버 오류',
        content: {
          'application/json': {
            example: {
              message: 'Internal Server Error',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
};
