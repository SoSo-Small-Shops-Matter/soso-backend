import { Module } from '@nestjs/common';
import { DeleteUserTransactionsRepository } from './delete-user.repository';
import { SubmitTransactionsRepository } from './submit.repository';
import { ReviewTransactionsRepository } from './review.repository';

@Module({
  providers: [DeleteUserTransactionsRepository, SubmitTransactionsRepository, ReviewTransactionsRepository],
  exports: [DeleteUserTransactionsRepository, SubmitTransactionsRepository, ReviewTransactionsRepository],
})
export class TransactionsModule {}
