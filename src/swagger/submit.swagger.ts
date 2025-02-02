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
                        phoneNumber: "987-654-3210",
                        monday: false,
                        tuesday: true,
                        wednesday: false,
                        thursday: true,
                        friday: true,
                        saturday: false,
                        sunday: true,
                        startTime: "10:00",
                        endTime: "20:00"
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
              phoneNumber: "987-654-3210",
              monday: false,
              tuesday: true,
              wednesday: false,
              thursday: true,
              friday: true,
              saturday: false,
              sunday: true,
              startTime: "10:00",
              endTime: "20:00"
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
              phoneNumber: "987-654-3210",
              monday: false,
              tuesday: true,
              wednesday: false,
              thursday: true,
              friday: true,
              saturday: false,
              sunday: true,
              startTime: "10:00",
              endTime: "20:00"
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
                      mondayStartHours: "09:00:00",
                      mondayEndHours: "18:00:00",
                      tuesdayStartHours: "09:00:00",
                      tuesdayEndHours: "18:00:00",
                      wednesdayStartHours: "09:00:00",
                      wednesdayEndHours: "18:00:00",
                      thursdayStartHours: "09:00:00",
                      thursdayEndHours: "18:00:00",
                      fridayStartHours: "09:00:00",
                      fridayEndHours: "18:00:00",
                      saturdayStartHours: "10:00:00",
                      saturdayEndHours: "16:00:00",
                      sundayStartHours: null,
                      sundayEndHours: null
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
                      "id": 1,
                      "phoneNumber": "987-654-3210",
                      "monday": false,
                      "tuesday": true,
                      "wednesday": false,
                      "thursday": true,
                      "friday": true,
                      "saturday": false,
                      "sunday": true,
                      startTime: "10:00",
                      endTime: "20:00"
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
