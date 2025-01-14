export const authSwaggerDocs = {
  google: {
    summary: '소셜 로그인 후 JWT 토큰 발급 API',
    description: '구글 소셜 로그인을 완료한 후 callBack 및 JWT Token 발급 API',
    responses: {
      200: {
        description: '로그인 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: "token",
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
      500: {
        description: '회원가입 실패 (내부 서버 오류)',
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
