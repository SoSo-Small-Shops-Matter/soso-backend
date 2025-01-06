import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './database/configs/typeorm.config';
import { UserModule } from './api/user/user.module';
import { ShopModule } from './api/shop/shop.module';
import { SubmitModule } from './api/submit/submit.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UserModule,
    ShopModule,
    SubmitModule,
  ],
})
export class AppModule {}
