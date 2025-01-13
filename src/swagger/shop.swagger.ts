export const shopSwaggerDocs = {
  getAllShop: {
    summary: '소품샵 전체 데이터 불러오기 API',
    description: '소품샵의 전체 데이터',
    responses: {
      200: {
        content: {
          'application/json': {
            example: {
              message: "Success",
              statusCode: 200,
              result: [
                {
                  id: 1,
                  name: "Green Valley Market",
                  reportStatus: 0,
                  lat: 37.7749,
                  lng: -122.419,
                  location: "123 Main St, San Francisco, CA",
                  operatingHours: [
                    {
                      id: 1,
                      phoneNumber: "123-456-7890",
                      mondayHours: "08:00-20:00",
                      tuesdayHours: "08:00-20:00",
                      wednesdayHours: "08:00-20:00",
                      thursdayHours: "08:00-20:00",
                      fridayHours: "08:00-20:00",
                      saturdayHours: "09:00-18:00",
                      sundayHours: "Closed"
                    }
                  ],
                  products: [
                    {
                      id: 1,
                      name: "Organic Apple"
                    },
                    {
                      id: 2,
                      name: "Whole Wheat Bread"
                    }
                  ],
                  // Review 추가
                },
                {
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
                  // Review 추가
                }
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
    summary: '소품샵 판매목록 업데이트',
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
                // Review 추가
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
