export const wishlistSwaggerDocs = {
    getUserWishlist: {
      summary: '사용자가 찜한 목록 불러오기 API',
      description: '사용자가 찜한 목록 불러오기',
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
                      id: 7,
                      name: "City Greens Market",
                      reportStatus: 0,
                      lat: 29.7604,
                      lng: -95.3698,
                      location: "404 Cedar St, Houston, TX"
                    }
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
          description: '회원가입 실패 (내부 서버 오류)',
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
    saveUserWishlist: {
      summary: '해당 소품샵 찜하기 API',
      description: '해당 소품샵 찜하기',
      requestBody: {
        description: '해당 소품샵 ID',
        required: true,
        content: {
          'application/json': {
            example: {
              shopId:7,
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
          description: '회원가입 실패 (내부 서버 오류)',
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
    checkUserWishlistByShopId: {
      summary: '해당 소품샵 찜하기 체크 API',
      description: '사용자가 해당 소품샵을 찜한 기록이 있는지 체크 반환값은 true or false',
      parameters: [
        {
          name: 'shopId',
          in: 'path',
          description: '소품샵의 고유 ID',
          required: true,
          schema: {
            type: 'string',
            example: '7'
          },
        },
      ],
      responses: {
        200: {
          description: '사용자가 해당 소품샵을 찜한경우',
          content: {
            'application/json': {
              example: {
                message: 'Success',
                statusCode: 200,
                result: true,
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
          description: '회원가입 실패 (내부 서버 오류)',
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
  