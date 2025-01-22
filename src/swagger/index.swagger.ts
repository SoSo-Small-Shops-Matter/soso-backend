import { authSwaggerDocs } from './auth.swagger';
import { shopSwaggerDocs } from './shop.swagger';
import { userSwaggerDocs } from './user.swagger';
import { submitSwaggerDocs } from './submit.swagger';
import { wishlistSwaggerDocs } from './wishlist.swagger';
import { reviewSwaggerDocs } from './review.swagger';

export const swaggerDocs = {
  paths: {
    // 인증 
    '/auth/google': {
      post: {
        ...authSwaggerDocs.google,
        tags: ['Auth'],
      },
    },

    // 유저 
    '/user/exist-nickname/{nickName}': {
      get: {
        ...userSwaggerDocs.getUserNickName,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/user/nickname': {
      post: {
        ...userSwaggerDocs.saveUserNickName,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      }
    },
    '/user/profile' : {
      put: {
        ...userSwaggerDocs.updateUserProfile,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      }
    },

    // 소풉샵 
    '/shop': {
      get: {
        ...shopSwaggerDocs.getShopWithin1Km,
        tags: ['Shop'],
      },
      put: {
        ...shopSwaggerDocs.updateShopProducts,
        tags: ['Shop'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/shop/search': {
      get: {
        ...shopSwaggerDocs.getSearchPageShop,
        tags: ['Shop'],
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
    },

    // 리뷰
    '/review': {
      get: {
        ...reviewSwaggerDocs.getUserReview,
        tags: ['Review'],
      },
      post: {
        ...reviewSwaggerDocs.createReview,
        tags: ['Review'],
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
    {
      name: 'Review',
    },
  ],
};
