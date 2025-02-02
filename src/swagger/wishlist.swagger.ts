export const wishlistSwaggerDocs = {
  saveUserWishlist: {
    summary: '해당 소품샵 찜하기 API',
    description: '해당 소품샵 찜하기',
    requestBody: {
      description: '해당 소품샵 ID',
      required: true,
      content: {
        'application/json': {
          example: {
            shopId:7,
          }
        },
      },
    },
    responses: {
      200: {
        description: '성공',
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
