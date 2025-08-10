import { Module } from '@nestjs/common';
import { DeleteUserTransactionsRepository } from './delete-user.repository';
import { SubmitTransactionsRepository } from './submit.repository';
import { ReviewTransactionsRepository } from './review.repository';
import { AdminTransactionsRepository } from './admin.repository';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [AwsModule],
  providers: [
    DeleteUserTransactionsRepository,
    SubmitTransactionsRepository,
    ReviewTransactionsRepository,
    AdminTransactionsRepository,
  ],
  exports: [
    DeleteUserTransactionsRepository,
    SubmitTransactionsRepository,
    ReviewTransactionsRepository,
    AdminTransactionsRepository,
  ],
})
export class TransactionsModule {}
