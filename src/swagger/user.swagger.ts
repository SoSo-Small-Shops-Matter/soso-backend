export const userSwaggerDocs = {
  getUserNickName: {
    summary: '닉네임 중복 체크 API',
    description:
      '사용자의 닉네임 중복 여부를 체크합니다. true면 중복된 닉네임, false면 중복되지 않은 닉네임',
    parameters: [
      {
        name: 'nickName',
        in: 'path',
        description: '닉네임',
        required: true,
        schema: {
          type: 'string',
          example: 'nickName',
        },
      },
    ],
    responses: {
      200: {
        description: '성공',
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
              message: 'Failed to save user case',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  saveUserNickName: {
    summary: '사용자 닉네임 저장 API',
    description: '회원가입 후 사용자의 닉네임을 저장합니다.',
    requestBody: {
      description: '사용자 닉네임',
      required: true,
      content: {
        'application/json': {
          example: {
            nickName: 'nickname',
          },
        },
      },
    },
    responses: {
      200: {
        description: '닉네임 저장 성공',
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
      409: {
        description: '존재하는 닉네임',
        content: {
          'application/json': {
            example: {
              message: 'Conflict',
              error: 'Conflict',
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
              message: 'Failed to save user case',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  updateUserProfile: {
    summary: '사용자 프로필 업데이트 API',
    description: '사용자 프로필 업데이트',
    requestBody: {
      description: '사용자 프로필 및 닉네임',
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              nickName: {
                type: 'string',
                example: 'nickName',
              },
              file: {
                type: 'file',
                items: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: '사용자 프로필 업데이트 성공',
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
      409: {
        description: '존재하는 닉네임',
        content: {
          'application/json': {
            example: {
              message: 'Conflict',
              error: 'Conflict',
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
  getUserSubmitRecords: {
    summary: '사용자가 등록한 소품샵 API',
    description:
      '사용자가 등록한 소품샵 데이터 불러오기 type:  0: 최초 제보  1: 운영 정보 수정 2: 판매 정보 수정 ',
    responses: {
      200: {
        description: '성공',
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
              message: 'Failed to save user case',
              error: 'Internal Server Error',
              statusCode: 500,
            },
          },
        },
      },
    },
  },
  getUserReview: {
    summary: '사용자 리뷰 데이터 불러오기 API',
    description: '사용자가 작성한 리뷰 데이터 불러오기',
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
                  content: 'good',
                  createdAt: '2025-01-14T11:06:15.098Z',
                  shop: {
                    id: 3,
                    name: 'Fresh Farm Foods',
                    reportStatus: 0,
                    lat: 40.7128,
                    lng: -74.006,
                    location: '789 Oak St, New York, NY',
                  },
                  images: [
                    {
                      id: 1,
                      url: 'url',
                    },
                  ],
                },
                {
                  id: 2,
                  content: 'good',
                  createdAt: '2025-01-14T11:13:25.077Z',
                  shop: {
                    id: 5,
                    name: 'Sunny Groceries',
                    reportStatus: 0,
                    lat: 41.8781,
                    lng: -87.6298,
                    location: '202 Maple St, Chicago, IL',
                  },
                  images: [
                    {
                      id: 2,
                      url: 'url',
                    },
                    {
                      id: 3,
                      url: 'url',
                    },
                  ],
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
                  name: 'City Greens Market',
                  reportStatus: 0,
                  lat: 29.7604,
                  lng: -95.3698,
                  location: '404 Cedar St, Houston, TX',
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
  getUserProfile: {
    summary: '사용자 정보 가져오기 API',
    description: '사용자 정보 가져오기',
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
                  uuid: 'uuid',
                  photoUrl: 'url',
                  nickname: 'nickname',
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
