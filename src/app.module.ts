import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './database/configs/typeorm.config';
import { UserModule } from './api/user/user.module';
import { ShopModule } from './api/shop/shop.module';
import { SubmitModule } from './api/submit/submit.module';
import { WishlistModule } from './api/wishlist/wishlist.module';
import { ReviewModule } from './api/review/review.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UserModule,
    ShopModule,
    SubmitModule,
    WishlistModule,
    ReviewModule,
  ],
})
export class AppModule {}
