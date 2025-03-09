export const noticeSwaggerDocs = {
  getAllNotice: {
    summary: '공지사항 불러오기 API',
    description: '공지사항 불러오기',
    responses: {
      200: {
        description: '성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: [
                {
                  id: 1,
                  text: '공지사항 얘기공지사항 얘기공지사항 얘기공지사항 얘기공지사항 얘기공지사항 얘기공지사항 얘기공지사항 얘기공지사항 얘기공지사항 얘기공지사항 얘기공지사항 얘기',
                  createdAt: '2025-03-03T02:06:13.489Z',
                  updatedAt: '2025-03-03T02:06:13.489Z',
                  deletedAt: null,
                },
              ],
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
