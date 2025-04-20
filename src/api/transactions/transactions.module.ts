import { Module } from '@nestjs/common';
import { DeleteUserTransactionsRepository } from './delete-user.repository';
import { SubmitTransactionsRepository } from './submit.repository';

@Module({
  providers: [DeleteUserTransactionsRepository, SubmitTransactionsRepository],
  exports: [DeleteUserTransactionsRepository, SubmitTransactionsRepository],
})
export class TransactionsModule {}
