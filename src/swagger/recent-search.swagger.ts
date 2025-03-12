export const recentSearchSwaggerDocs = {
  getRecentSearch: {
    summary: '유저 최근 검색 데이터 불러오기 API',
    description: '유저 최근 검색 최대 10개 데이터 불러오기',
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
                  id: 14,
                  uuid: '102784937796556996262',
                  shopName: '앱톤 성수 쇼룸',
                  createdAt: '2025-03-11T03:36:52.581Z',
                },
                {
                  id: 13,
                  uuid: '102784937796556996262',
                  shopName: '벤자민',
                  createdAt: '2025-03-11T03:36:01.054Z',
                },
                {
                  id: 12,
                  uuid: '102784937796556996262',
                  shopName: '봄을상자 숲길점',
                  createdAt: '2025-03-11T03:35:46.700Z',
                },
                {
                  id: 11,
                  uuid: '102784937796556996262',
                  shopName: '더넛',
                  createdAt: '2025-03-11T03:32:38.810Z',
                },
                {
                  id: 10,
                  uuid: '102784937796556996262',
                  shopName: '더나인몰 건대점',
                  createdAt: '2025-03-11T03:32:37.064Z',
                },
                {
                  id: 9,
                  uuid: '102784937796556996262',
                  shopName: '플랜누아',
                  createdAt: '2025-03-11T03:32:35.662Z',
                },
                {
                  id: 8,
                  uuid: '102784937796556996262',
                  shopName: '메르블루',
                  createdAt: '2025-03-11T03:32:34.341Z',
                },
                {
                  id: 7,
                  uuid: '102784937796556996262',
                  shopName: 'MANYVERYMUCH',
                  createdAt: '2025-03-11T03:32:31.712Z',
                },
                {
                  id: 6,
                  uuid: '102784937796556996262',
                  shopName: '이룬',
                  createdAt: '2025-03-11T03:32:28.716Z',
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
  deleteRecentSearch: {
    summary: '최근 검색 지우기 API',
    description: '소품샵 이름으로 최근 검색 지우기',
    requestBody: {
      description: '소품샵 이름',
      required: true,
      content: {
        'application/json': {
          example: {
            shopName: 'MANYVERYMUCH',
          },
        },
      },
    },
    responses: {
      204: {
        description: '성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 204,
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
