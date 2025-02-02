import { Module, forwardRef } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/database/entity/shop.entity';
import { ShopRepository } from './shop.repository';
import { AuthModule } from '../auth/auth.module';
import { ReviewModule } from '../review/review.module';
import { SubmitModule } from '../submit/submit.module';
import { WishlistModule } from '../wishlist/wishlist.module';

@Module({
    imports: [
        forwardRef(() => SubmitModule),
        forwardRef(() =>  AuthModule),
        TypeOrmModule.forFeature([Shop]),
        ReviewModule,WishlistModule,
    ],
    controllers: [ShopController],
    providers: [ShopService,ShopRepository],
    exports:[ShopRepository],
})
export class ShopModule {}
