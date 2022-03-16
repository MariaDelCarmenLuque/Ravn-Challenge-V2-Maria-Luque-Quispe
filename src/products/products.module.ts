import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/category.entity';
import { ProductsController } from './controller/products.controller';
import { Product } from './models/product.entity';
import { ProductsService } from './service/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product,Category]),
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  
  exports: [ProductsService],
})
export class ProductsModule {}
