import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controller/products.controller';
import { Product } from './models/product.entity';
import { ProductsService } from './service/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
