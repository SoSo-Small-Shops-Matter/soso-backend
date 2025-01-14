export const submitSwaggerDocs = {
  getAllSubmitShop: {
    summary: '제보된 전체 소품샵 API -> Admin',
    description: '사용자가 제보한 소품샵 전체 보기',
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
                  existShop: false,
                  name: "Green Valley Market",
                  lat: 37.7749,
                  lng: -122.419,
                  location: "123 Main St, San Francisco, CA",
                  submitOperatingHours: [
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
                  submitProducts: []
                },
                {
                  id: 2,
                  existShop: false,
                  name: "Green Valley Market2",
                  lat: 37.7749,
                  lng: -122.419,
                  location: "123 Main St, San Francisco, CA2",
                  submitOperatingHours: [],
                  submitProducts: []
                },
              ]            
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
  submitNewShop: {
    summary: '새로운 소풉샵 제보하기 API',
    description: '사용자가 제보한 소품샵 저장하기',
    requestBody: {
      description: '새로운 소품샵 제보 데이터',
      required: true,
      content: {
        'application/json': {
          example: {
            shop:{
              name: "shop name",
              lat: 37.012302123,
              lng: 111.232123,
              location: "shop location"
            },
            operatingHours: {
              phoneNumber: "123-456-7890",
              mondayHours: "08:00-20:00",
              tuesdayHours: "08:00-20:00",
              wednesdayHours: "08:00-20:00",
              thursdayHours: "08:00-20:00",
              fridayHours: "08:00-20:00",
              saturdayHours: "09:00-18:00",
              sundayHours: "Closed"
            },
            products: [
              {
                id:1,
                name:"스티커",
              },
              {
                id:2,
                name: "컵",
              }
            ]
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
  submitOperating: {
    summary: '기존에 존재하는 소품샵 운영시간 제안하기 API',
    description: '사용자가 기존에 존재하는 소품샵 운영시간 제안',
    requestBody: {
      description: '새로운 소품샵 제보 데이터',
      required: true,
      content: {
        'application/json': {
          example: {
            shopId:3,
            operatingHours: {
              phoneNumber: "123-456-7890",
              mondayHours: "08:00-20:00",
              tuesdayHours: "08:00-20:00",
              wednesdayHours: "08:00-20:00",
              thursdayHours: "08:00-20:00",
              fridayHours: "08:00-20:00",
              saturdayHours: "09:00-18:00",
              sundayHours: "Closed"
            }
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
  getSubmitOperating: {
    summary: '소품샵 운영시간 제안 전체 데이터 불러오기 API -> Admin',
    description: '소품샵 운영시간 제안 전체 데이터 불러오기',
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
                  existShop: true,
                  name: "Green Valley Market",
                  lat: 37.7749,
                  lng: -122.419,
                  location: "123 Main St, San Francisco, CA",
                  submitOperatingHours: [
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
                  ]
                },
                {
                  id: 3,
                  existShop: true,
                  name: "Fresh Farm Foods",
                  lat: 40.7128,
                  lng: -74.006,
                  location: "789 Oak St, New York, NY",
                  submitOperatingHours: [
                      {
                          id: 2,
                          phoneNumber: "123-456-7890",
                          mondayHours: "08:00-20:00",
                          tuesdayHours: "08:00-20:00",
                          wednesdayHours: "08:00-20:00",
                          thursdayHours: "08:00-20:00",
                          fridayHours: "08:00-20:00",
                          saturdayHours: "09:00-18:00",
                          sundayHours: "Closed"
                      }
                  ]
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
