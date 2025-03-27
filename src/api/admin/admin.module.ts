import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SubmitModule } from '../submit/submit.module';

@Module({
  imports: [SubmitModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
