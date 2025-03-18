export const reportSwaggerDocs = {
  reportShop: {
    summary: '소품샵 신고하기 API',
    description: 'status: 0: 더 이상 운영하지 않는 가게에요.\n' + '1: 위치가 잘못됐어요.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          example: {
            shopId: 2,
            status: 3,
          },
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
              statusCode: 201,
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
  reportReview: {
    summary: '리뷰 신고하기 API',
    description:
      'status:  0: 리뷰 신고하기' +
      '1: 관련 없는 후기입니다.\n' +
      '2: 음란, 욕설 등 부적절한 내용입니다\n' +
      '3: 개인정보를 노출했습니다.\n' +
      '4: 홍보 및 광고 후기입니다.\n' +
      '5: 같은 내용을 도배하였습니다.\n' +
      '6: 기타',
    requestBody: {
      description: '리뷰 신고 데이터',
      required: true,
      content: {
        'application/json': {
          example: {
            reviewId: 2,
            status: 3,
          },
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
              statusCode: 201,
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
