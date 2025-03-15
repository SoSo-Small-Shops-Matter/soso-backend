import { shopSwaggerDocs } from './shop.swagger';
import { userSwaggerDocs } from './user.swagger';
import { submitSwaggerDocs } from './submit.swagger';
import { wishlistSwaggerDocs } from './wishlist.swagger';
import { reviewSwaggerDocs } from './review.swagger';
import { feedbackSwaggerDocs } from './feedback.swagger';
import { noticeSwaggerDocs } from './notice.swagger';
import { recentSearchSwaggerDocs } from './recent-search.swagger';

export const swaggerDocs = {
  paths: {
    // 유저
    '/user/{uuid}': {
      delete: {
        ...userSwaggerDocs.deleteUser,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/user/nickname/{nickName}': {
      get: {
        ...userSwaggerDocs.getUserNickName,
        tags: ['User'],
      },
    },
    '/user/nickname': {
      post: {
        ...userSwaggerDocs.saveUserNickName,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/user/profile': {
      patch: {
        ...userSwaggerDocs.updateUserProfile,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      },
      get: {
        ...userSwaggerDocs.getUserProfile,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/user/submit': {
      get: {
        ...userSwaggerDocs.getUserSubmitRecords,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/user/review': {
      get: {
        ...userSwaggerDocs.getUserReview,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/user/wishlist': {
      get: {
        ...userSwaggerDocs.getUserWishlist,
        tags: ['User'],
        security: [{ 'JWT-auth': [] }],
      },
    },

    // 소풉샵
    '/shop': {
      get: {
        ...shopSwaggerDocs.getShopWithin1Km,
        tags: ['Shop'],
      },
      patch: {
        ...shopSwaggerDocs.updateShopProducts,
        tags: ['Shop'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/shop/region': {
      get: {
        ...shopSwaggerDocs.getShopRegion,
        tags: ['Shop'],
      },
    },
    '/shop/search': {
      get: {
        ...shopSwaggerDocs.getSearchPageShop,
        tags: ['Shop'],
      },
    },
    '/shop/report': {
      patch: {
        ...shopSwaggerDocs.reportShop,
        tags: ['Shop'],
      },
    },
    '/shop/{shopId}': {
      get: {
        ...shopSwaggerDocs.getShopByShopId,
        security: [{ 'JWT-auth': [] }],
        tags: ['Shop'],
      },
    },

    // 새로운 소풉샵 제안
    '/submit': {
      post: {
        ...submitSwaggerDocs.submitNewShop,
        tags: ['Submit'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/submit/operating': {
      post: {
        ...submitSwaggerDocs.submitOperating,
        tags: ['Submit'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/submit/products': {
      post: {
        ...submitSwaggerDocs.submitProducts,
        tags: ['Submit'],
        security: [{ 'JWT-auth': [] }],
      },
    },

    // 찜하기
    '/wishlist': {
      post: {
        ...wishlistSwaggerDocs.saveUserWishlist,
        tags: ['Wishlist'],
        security: [{ 'JWT-auth': [] }],
      },
    },

    // 리뷰
    '/review': {
      post: {
        ...reviewSwaggerDocs.createReview,
        tags: ['Review'],
        security: [{ 'JWT-auth': [] }],
      },
      patch: {
        ...reviewSwaggerDocs.updateReview,
        tags: ['Review'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/review/{reviewId}': {
      delete: {
        ...reviewSwaggerDocs.deleteReview,
        tags: ['Review'],
        security: [{ 'JWT-auth': [] }],
      },
    },

    '/feedback': {
      post: {
        ...feedbackSwaggerDocs.saveFeedback,
        tags: ['Feedback'],
        security: [{ 'JWT-auth': [] }],
      },
    },

    '/notice': {
      get: {
        ...noticeSwaggerDocs.getAllNotice,
        tags: ['Notice'],
      },
    },

    '/recent-search': {
      get: {
        ...recentSearchSwaggerDocs.getRecentSearch,
        tags: ['RecentSearch'],
        security: [{ 'JWT-auth': [] }],
      },
      delete: {
        ...recentSearchSwaggerDocs.deleteRecentSearch,
        tags: ['RecentSearch'],
        security: [{ 'JWT-auth': [] }],
      },
    },
    '/recent-search/all': {
      delete: {
        ...recentSearchSwaggerDocs.deleteAllRecentSearch,
        tags: ['RecentSearch'],
        security: [{ 'JWT-auth': [] }],
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
    {
      name: 'Submit',
    },
    {
      name: 'Wishlist',
    },
    {
      name: 'Review',
    },
    {
      name: 'Feedback',
    },
    {
      name: 'Notice',
    },
    {
      name: 'RecentSearch',
    },
  ],
};
