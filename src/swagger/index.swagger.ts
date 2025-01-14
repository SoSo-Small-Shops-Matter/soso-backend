import { authSwaggerDocs } from './auth.swagger';
import { shopSwaggerDocs } from './shop.swagger';
import { userSwaggerDocs } from './user.swagger';
import { submitSwaggerDocs } from './submit.swagger';
import { wishlistSwaggerDocs } from './wishlist.swagger';

export const swaggerDocs = {
  paths: {
    // 인증 
    '/auth/google': {
      get: {
        ...authSwaggerDocs.google,
        tags: ['Auth'],
      },
    },

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

    // 새로운 소풉샵 제안
    '/submit': {
      get: {
        ...submitSwaggerDocs.getAllSubmitShop,
        tags: ['Submit'],
        security: [{ 'JWT-auth': [] }],
      },
      post: {
        ...submitSwaggerDocs.submitNewShop,
        tags: ['Submit'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/submit/operating': {
      get: {
        ...submitSwaggerDocs.getSubmitOperating,
        tags: ['Submit'],
        security: [{ 'JWT-auth': [] }],
      },
      post: {
        ...submitSwaggerDocs.submitOperating,
        tags: ['Submit'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    
    // 찜하기 
    '/wishlist': {
      get: {
        ...wishlistSwaggerDocs.getUserWishlist,
        tags: ['Wishlist'],
        security: [{ 'JWT-auth': [] }],
      },
      post: {
        ...wishlistSwaggerDocs.saveUserWishlist,
        tags: ['Wishlist'],
        security: [{ 'JWT-auth': [] }],
      }
    },
    '/wishlist/{shopId}': {
      get: {
        ...wishlistSwaggerDocs.checkUserWishlistByShopId,
        tags: ['Wishlist'],
        security: [{ 'JWT-auth': [] }],
      },
    }
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
    {
      name: 'Submit',
    },
    {
      name: 'Wishlist',
    },
    
  ],
};
