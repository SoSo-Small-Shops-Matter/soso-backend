export const shopSwaggerDocs = {
  getAllShop: {
    summary: '1KM 내 소품샵 데이터 불러오기 API',
    description: '사용자 위치 기준 1KM 내 소품샵의 데이터',
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
    ],
    responses: {
      200: {
        content: {
          'application/json': {
            example: {
              message: "Success",
              statusCode: 200,
              result: [
                {
                    "id": 2,
                    "name": "더넛",
                    "reportStatus": 0,
                    "lat": 37.5666,
                    "lng": 126.978,
                    "location": "서울 성동구 상원6나길 6 B동 302호"
                },
                {
                    "id": 3,
                    "name": "봄을상자 숲길점",
                    "reportStatus": 0,
                    "lat": 37.5664,
                    "lng": 126.978,
                    "location": "서울 마포구 성미산로23길 30 지1층"
                },
              ]
            }            
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
                name: "스티커",
              },
              {
                id: 2,
                name: "컵",
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
    description: '특정 소품샵 ID를 통해 해당 소품샵의 데이터를 불러오는 API',
    parameters: [
      {
        name: 'shopId',
        in: 'path',
        description: '소품샵의 고유 ID',
        required: true,
        schema: {
          type: 'string',
          example: '12'
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
                id: 2,
                name: "Blue Ocean Mart",
                reportStatus: 0,
                lat: 34.0522,
                lng: -118.244,
                location: "456 Elm St, Los Angeles, CA",
                operatingHours: [
                  {
                    id: 2,
                    phoneNumber: "234-567-8901",
                    mondayHours: "09:00-21:00",
                    tuesdayHours: "09:00-21:00",
                    wednesdayHours: "09:00-21:00",
                    thursdayHours: "09:00-21:00",
                    fridayHours: "09:00-21:00",
                    saturdayHours: "10:00-19:00",
                    sundayHours: "Closed"
                  }
                ],
                products: [
                  {
                    id: 3,
                    name: "Almond Milk"
                  },
                  {
                    id: 4,
                    name: "Free Range Eggs"
                  }
                ],
                reviews: [
                  {
                      id: 1,
                      content: "good",
                      createdAt: "2025-01-14T11:06:15.098Z",
                      images: [
                          {
                              id: 1,
                              url: "url"
                          }
                      ]
                  },
                  {
                      id: 4,
                      content: "Great shop with amazing coffee!",
                      createdAt: "2025-01-14T11:29:53.636Z",
                      images: [
                          {
                              id: 4,
                              url: "url"
                          },
                          {
                              id: 5,
                              url: "url"
                          }
                      ]
                  }
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
              message: "NOT_FOUND_SHOP",
              error: "Not Found",
              statusCode: 404
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
