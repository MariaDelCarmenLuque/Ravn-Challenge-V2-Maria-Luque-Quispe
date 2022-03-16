import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/products/models/product.entity';
import { CartItemsController } from './controller/cartItems.controller';
import { CartItem } from './models/cartItems.entity';
import { CartItemsService } from './service/cartItems.service';

@Module({
  providers: [CartItemsService],
  controllers:[CartItemsController],
  imports: [TypeOrmModule.forFeature([CartItem, Product,Cart])]
})
export class CartItemsModule {}