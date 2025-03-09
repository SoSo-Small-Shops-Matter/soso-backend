export const reviewSwaggerDocs = {
  createReview: {
    summary: '리뷰 작성하기 API',
    description: '사용자가 작성한 리뷰 데이터 저장하기',
    requestBody: {
      description: '새로운 리뷰 데이터와 파일 업로드',
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              shopId: {
                type: 'integer',
                example: 3,
              },
              content: {
                type: 'string',
                example: 'Great shop with amazing coffee!',
              },
              files: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
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
  updateReview: {
    summary: '리뷰 수정하기 API',
    description: '사용자가 작성한 리뷰 데이터 수정하기',
    requestBody: {
      description: '새로운 리뷰 데이터와 파일 업로드',
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              reviewId: {
                type: 'integer',
                example: 3,
              },
              content: {
                type: 'string',
                example: 'Great shop with amazing coffee!',
              },
              deleteImages: {
                type: 'array',
                description: '삭제할 이미지 목록 (배열)',
                items: {
                  type: 'integer',
                  example: 1,
                },
              },
              newFiles: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
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
  deleteReview: {
    summary: '리뷰 삭제하기 API',
    description: '사용자가 작성한 리뷰 데이터 삭제하기',
    parameters: [
      {
        name: 'reviewId',
        in: 'path',
        description: '리뷰 ID',
        required: true,
        schema: {
          type: 'string',
          example: '3',
        },
      },
    ],
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
