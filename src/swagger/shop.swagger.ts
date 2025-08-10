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
      {
        name: 'isWishlist',
        in: 'query',
        required: true,
        description: '찜 목록에 포함되어 있는지 여부',
        schema: {
          type: 'string',
          example: 'true',
        },
      },
      {
        name: 'productIds',
        in: 'query',
        required: false,
        description: '소품샵 상품 ID',
        schema: {
          type: 'array',
          items: {
            type: 'number',
          },
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
                recentSearch: [
                  {
                    uuid: '102784937796556996262',
                    shopName: '헤이데이 성수',
                    id: 15,
                    createdAt: '2025-03-11T03:37:40.943Z',
                  },
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
  getSearchPageShop: {
    summary: '소품샵 이름 또는 도로명으로 검색 API',
    description: '검색 페이지에서 사용자가 소품샵 이름 또는 도로명으로 검색할 때 사용',
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
        name: 'keyword',
        in: 'query',
        required: true,
        description: '소품샵이름 또는 도로명',
        schema: {
          type: 'string',
          example: '더',
        },
      },
      {
        name: 'limit',
        in: 'query',
        required: true,
        description: '한 페이지당 개수',
        schema: {
          type: 'number',
          example: 10,
        },
      },
      {
        name: 'page',
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
              result: {
                data: [
                  {
                    id: 2,
                    name: '더넛',
                    image: '',
                    type: 0,
                    reportStatus: 0,
                    lat: 37.5666,
                    lng: 126.978,
                    location: '서울 성동구 상원6나길 6 B동 302호',
                  },
                  {
                    id: 11,
                    name: '더나인몰 건대점',
                    image: '',
                    type: 0,
                    reportStatus: 0,
                    lat: 37.566,
                    lng: 126.979,
                    location: '서울 광진구 동일로20길 44 덕우빌딩 1층',
                  },
                  {
                    id: 19,
                    name: '더나인몰 서울숲점',
                    image: null,
                    type: 0,
                    reportStatus: 0,
                    lat: 37.5472,
                    lng: 127.043,
                    location: '서울 성동구 서울숲4길 20 1층 더나인몰 서울숲점',
                  },
                  {
                    id: 21,
                    name: '더나인몰 건대점',
                    image: null,
                    type: 0,
                    reportStatus: 0,
                    lat: 37.5408,
                    lng: 127.066,
                    location: '서울 광진구 동일로20길 44 덕유빌딩 1층',
                  },
                ],
                pageInfo: {
                  page: 1,
                  limit: 10,
                  totalElements: 1,
                  totalPages: 1,
                },
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
  getShopRegion: {
    summary: '지역 데이터 불러오기 API',
    description: '지역 데이터 불러오기 API',
    responses: {
      200: {
        content: {
          'application/json': {
            example: {
              message: 'Success',
              statusCode: 200,
              result: ['서울', '대전', '대구', '천안', '제주'],
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
