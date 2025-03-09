export const feedbackSwaggerDocs = {
  saveFeedback: {
    summary: '피드백 저장 API',
    description: '피드백 저장',
    requestBody: {
      description: '유저가 쓴 피드백',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              feedback: {
                type: 'string',
                example: '유저 피드백 내용',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
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
