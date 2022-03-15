import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Cart } from 'src/cart/entity/cart.entity';
import { Order } from 'src/orders/models/orders.entity';
import { OrdersService } from 'src/orders/service/orders.service';
import { CreateOrderDTO } from '../models/create-order.dto';

@Controller('carts')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Get(':cartId/products')
  async getAll(
      @Param('cartId') cartId: number,
    ): Promise<Order[]> {
      const orders: Order[] = await this.ordersService.findAllFromCart(cartId);
      if(!orders){
          throw new HttpException('Order Not Found',HttpStatus.BAD_REQUEST)
      }
      return orders;
    }


  @Post(':cartId/products/:productId')
  create(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
    @Body() body: CreateOrderDTO,
  ): Promise<Order> {
    return this.ordersService.create(cartId, productId, body);
  }
}
