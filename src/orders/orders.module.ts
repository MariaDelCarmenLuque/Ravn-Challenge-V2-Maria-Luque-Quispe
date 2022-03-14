import { Module } from '@nestjs/common';
import { OrdersService } from './service/orders/orders.service';

@Module({
  providers: [OrdersService]
})
export class OrdersModule {}
