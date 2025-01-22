export const reviewSwaggerDocs = {
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
                      content: "good",
                      createdAt: "2025-01-14T11:06:15.098Z",
                      shop: {
                          id: 3,
                          name: "Fresh Farm Foods",
                          reportStatus: 0,
                          lat: 40.7128,
                          lng: -74.006,
                          location: "789 Oak St, New York, NY"
                      },
                      images: [
                          {
                              id: 1,
                              url: "url"
                          }
                      ]
                  },
                  {
                      id: 2,
                      content: "good",
                      createdAt: "2025-01-14T11:13:25.077Z",
                      shop: {
                          id: 5,
                          name: "Sunny Groceries",
                          reportStatus: 0,
                          lat: 41.8781,
                          lng: -87.6298,
                          location: "202 Maple St, Chicago, IL"
                      },
                      images: [
                          {
                              id: 2,
                              url: "url"
                          },
                          {
                              id: 3,
                              url: "url"
                          }
                      ]
                  }
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
  createReview: {
    summary: '리뷰 작성하기 API',
    description: '사용자가 작성한 리뷰 데이터 저장하기',
    requestBody: {
      description: '새로운 리뷰 데이터와 파일 업로드',
      required: true,
      content: {
          'multipart/form-data': { 
              schema: {
                  type: 'object',
                  properties: {
                      shopId: {
                          type: 'integer',
                          example: 3
                      },
                      content: {
                          type: 'string',
                          example: 'Great shop with amazing coffee!'
                      },
                      files: { 
                          type: 'array', 
                          items: {
                              type: 'string',
                              format: 'binary'
                          }
                      }
                  }
              }
          }
      }
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
  updateReview: {
    summary: '리뷰 수정하기 API',
    description: '사용자가 작성한 리뷰 데이터 수정하기',
    requestBody: {
      description: '새로운 리뷰 데이터와 파일 업로드',
      required: true,
      content: {
          'multipart/form-data': { 
              schema: {
                  type: 'object',
                  properties: {
                      shopId: {
                          type: 'integer',
                          example: 3
                      },
                      content: {
                          type: 'string',
                          example: 'Great shop with amazing coffee!'
                      },
                      files: { 
                          type: 'array', 
                          items: {
                              type: 'string',
                              format: 'binary'
                          }
                      }
                  }
              }
          }
      }
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
  deleteReview: {
    summary: '리뷰 삭제하기 API',
    description: '사용자가 작성한 리뷰 데이터 삭제하기',
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
};
