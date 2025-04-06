import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { ReportModule } from './api/report/report.module';
import { ImageModule } from './api/image/image.module';
import { AdminModule } from './api/admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/database/entity/*.entity.{ts,js}'],
        synchronize: false,
      }),
    }),
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
    ReportModule,
    ImageModule,
    AdminModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
