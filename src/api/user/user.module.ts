import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/database/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AwsModule } from '../aws/aws.module';
import { ReviewModule } from '../review/review.module';
import { WishlistModule } from '../wishlist/wishlist.module';
import { SubmitModule } from '../submit/submit.module';
import { RecentSearchModule } from '../recent-search/recent-search.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    forwardRef(() => SubmitModule),
    TypeOrmModule.forFeature([User]),
    AwsModule,
    ReviewModule,
    WishlistModule,
    RecentSearchModule,
    TransactionsModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
