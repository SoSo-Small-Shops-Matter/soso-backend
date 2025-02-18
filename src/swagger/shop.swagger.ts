export const shopSwaggerDocs = {
  getShopWithin1Km: {
    summary: '1KM 내 소품샵 데이터 불러오기 API & 후기 순 불러오기',
    description: '사용자 위치 기준 1KM 내 소품샵의 데이터 & 후기 순 불러오기',
    parameters: [
      {
        name: 'lat',
        in: 'query',
        required: true,
        description: '사용자의 위도 (latitude)',
        schema: {
          type: 'number',
          example: 37.5665,
        },
      },
      {
        name: 'lng',
        in: 'query',
        required: true,
        description: '사용자의 경도 (longitude)',
        schema: {
          type: 'number',
          example: 126.978,
        },
      },
      {
        name: 'sorting',
        in: 'query',
        required: true,
        description: '후기 순으로 정렬할 것인지 여부',
        schema: {
          type: 'boolean',
          example: true,
        },
      },
    ],
    responses: {
      200: {
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: [
                {
                  id: 2,
                  name: '더넛',
                  reportStatus: 0,
                  lat: 37.5666,
                  lng: 126.978,
                  location: '서울 성동구 상원6나길 6 B동 302호',
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
  updateShopProducts: {
    summary: '소품샵 판매목록 업데이트 API',
    description: '소품샵의 판매목록을 사용자가 제안하는 목록으로 업데이트',
    requestBody: {
      description: '기존 소품샵 ID와 사용자가 제안하는 목록 데이터',
      required: true,
      content: {
        'application/json': {
          example: {
            shopId: 10,
            products: [
              {
                id: 1,
                name: '스티커',
              },
              {
                id: 2,
                name: '컵',
              },
            ],
          },
        },
      },
    },
    responses: {
      200: {
        description: '소품샵 판매목록 업데이트 성공',
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
  getShopByShopId: {
    summary: '장소 상세보기 API',
    description: 'shop, userReviews, otherReviews 데이터가 존재함',
    parameters: [
      {
        name: 'shopId',
        in: 'path',
        description: '소품샵의 고유 ID',
        required: true,
        schema: {
          type: 'string',
          example: '12',
        },
      },
    ],
    responses: {
      200: {
        description: '장소 상세보기 API 불러오기 성공',
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: {
                shop: {
                  id: 3,
                  name: '봄을상자 숲길점',
                  reportStatus: 1,
                  lat: 37.5664,
                  lng: 126.978,
                  location: '서울 마포구 성미산로23길 30 지1층',
                  operatingHours: [
                    {
                      id: 2,
                      phoneNumber: '987-654-3210',
                      monday: false,
                      tuesday: true,
                      wednesday: false,
                      thursday: true,
                      friday: true,
                      saturday: false,
                      sunday: true,
                      startTime: '10:00',
                      endTime: '20:00',
                    },
                  ],
                  products: [
                    { id: 1, name: '스티커' },
                    { id: 2, name: '인형' },
                    { id: 5, name: '키링' },
                    { id: 7, name: '악세서리' },
                  ],
                },
                userReviews: [
                  {
                    id: 11,
                    content: 'Affordable prices!',
                    createdAt: '2025-01-05T05:00:00.000Z',
                    images: [],
                    user: {
                      uuid: '100696381122086866149',
                      photoUrl: '',
                      nickName: 'nickNam',
                    },
                  },
                  {
                    id: 10,
                    content: 'Great selection!',
                    createdAt: '2025-01-04T04:00:00.000Z',
                    images: [],
                    user: {
                      uuid: '100696381122086866149',
                      photoUrl: '',
                      nickName: 'nickNam',
                    },
                  },
                  {
                    id: 9,
                    content: 'Highly recommend!',
                    createdAt: '2025-01-03T03:00:00.000Z',
                    images: [],
                    user: {
                      uuid: '100696381122086866149',
                      photoUrl: '',
                      nickName: 'nickNam',
                    },
                  },
                  {
                    id: 8,
                    content: 'Friendly staff!',
                    createdAt: '2025-01-02T02:00:00.000Z',
                    images: [],
                    user: {
                      uuid: '100696381122086866149',
                      photoUrl: '',
                      nickName: 'nickNam',
                    },
                  },
                  {
                    id: 7,
                    content: 'Amazing place!',
                    createdAt: '2025-01-01T01:00:00.000Z',
                    images: [],
                    user: {
                      uuid: '100696381122086866149',
                      photoUrl: '',
                      nickName: 'nickNam',
                    },
                  },
                ],
                otherReviews: [
                  {
                    id: 16,
                    content: 'test',
                    createdAt: '2025-01-26T10:30:12.655Z',
                    images: [],
                    user: {
                      uuid: 'test',
                      photoUrl: '',
                      nickName: 'test',
                    },
                  },
                  {
                    id: 15,
                    content: 'test',
                    createdAt: '2025-01-26T10:30:12.653Z',
                    images: [],
                    user: {
                      uuid: 'test',
                      photoUrl: '',
                      nickName: 'test',
                    },
                  },
                ],
                wishlist: false,
              },
            },
          },
        },
      },
      400: {
        description: '유효하지 않은 요청 데이터',
        content: {
          'application/json': {
            example: {
              message: '질문 또는 데이터가 존재하지 않습니다',
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
      404: {
        description: '존재하지 않는 데이터',
        content: {
          'application/json': {
            example: {
              message: 'NOT_FOUND_SHOP',
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
  reportShop: {
    summary: '신고하기 API',
    description:
      '소품샵의 정보가 일치하지 않을경우 신고하는 기능 report:1 -> 더이상 존재하지 않는 소품샵 , report:2 -> 위치가 잘못된 소품샵',
    requestBody: {
      description: '신고하기',
      required: true,
      content: {
        'application/json': {
          example: {
            shopId: 3,
            report: 1,
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
  getSearchPageShop: {
    summary: '소품샵 이름으로 검색 API',
    description: '검색 페이지에서 사용자가 소품샵 이름으로 검색할 때 사용',
    parameters: [
      {
        name: 'name',
        in: 'query',
        required: true,
        description: '소품샵이름',
        schema: {
          type: 'string',
          example: '뉴뉴',
        },
      },
      {
        name: 'pageSize',
        in: 'query',
        required: true,
        description: '한 페이지당 개수',
        schema: {
          type: 'number',
          example: 10,
        },
      },
      {
        name: 'limit',
        in: 'query',
        required: true,
        description: '페이지 번호',
        schema: {
          type: 'number',
          example: 1,
        },
      },
    ],
    responses: {
      200: {
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: [
                {
                  id: 3,
                  name: '봄을상자 숲길점',
                  type: 0,
                  reportStatus: 0,
                  lat: 37.5664,
                  lng: 126.978,
                  location: '서울 마포구 성미산로23길 30 지1층',
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
