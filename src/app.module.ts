import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './database/configs/typeorm.config';
import { UserModule } from './api/user/user.module';
import { ShopModule } from './api/shop/shop.module';
import { SubmitModule } from './api/submit/submit.module';
import { WishlistModule } from './api/wishlist/wishlist.module';
import { ReviewModule } from './api/review/review.module';
import { AwsModule } from './api/aws/aws.module';
import { AppController } from './app.controller';
import { ProductModule } from './api/product/product.module';
import { OperateModule } from './api/operate/operate.module';
import { RegionModule } from './api/region/region.module';
import { NoticeModule } from './api/notice/notice.module';
import { FeedbackModule } from './api/feedback/feedback.module';
import { RecentSearchModule } from './api/recent-search/recent-search.module';
import { LoggerModule } from './api/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UserModule,
    ShopModule,
    SubmitModule,
    WishlistModule,
    ReviewModule,
    AwsModule,
    ProductModule,
    OperateModule,
    RegionModule,
    NoticeModule,
    FeedbackModule,
    RecentSearchModule,
    LoggerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
