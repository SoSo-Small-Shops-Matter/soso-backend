import { Module } from '@nestjs/common';
import { DeleteUserTransactionsRepository } from './delete-user.repository';
import { SubmitTransactionsRepository } from './submit.repository';
import { ReviewTransactionsRepository } from './review.repository';
import { AdminTransactionsRepository } from './admin.repository';

@Module({
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
