import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMapping } from 'src/database/entity/product_mapping.entity';
import { ProductRepository } from './product.repository';

@Module({
    imports:[TypeOrmModule.forFeature([ProductMapping])],
    providers:[ProductRepository],
    exports:[ProductRepository],
})
export class ProductModule {}
