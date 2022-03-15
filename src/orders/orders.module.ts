import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/products/models/product.entity';
import { OrdersController } from './controller/orders.controller';
import { Order } from './models/orders.entity';
import { OrdersService } from './service/orders.service';

@Module({
  providers: [OrdersService],
  controllers:[OrdersController],
  imports: [TypeOrmModule.forFeature([Order, Product,Cart])]
})
export class OrdersModule {}
