import { authSwaggerDocs } from './auth.swagger';
import { shopSwaggerDocs } from './shop.swagger';
import { userSwaggerDocs } from './user.swagger';

export const swaggerDocs = {
  paths: {
    // 유저 
    '/user/nickname': {
      post: {
        ...userSwaggerDocs.saveUserNickName,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      },
      put: {
        ...userSwaggerDocs.updateUserNickName,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      }
    },

    // 인증 
    '/auth/google': {
      get: {
        ...authSwaggerDocs.google,
        tags: ['Auth'],
      },
    },

    // 소풉샵 
    '/shop': {
      get: {
        ...shopSwaggerDocs.getAllShop,
        tags: ['Shop'],
      },
      put: {
        ...shopSwaggerDocs.updateShopProducts,
        tags: ['Shop'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/shop/{shopId}': {
      get: {
        ...shopSwaggerDocs.getShopByShopId,
        tags: ['Shop'],
      },
    },
  },
  tags: [
    {
      name: 'Auth',
    },
    {
      name: 'User',
    },
    {
      name: 'Shop',
    },
  ],
};
