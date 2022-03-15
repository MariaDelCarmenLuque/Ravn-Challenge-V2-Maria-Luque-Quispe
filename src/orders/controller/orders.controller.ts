import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';


import { Order } from 'src/orders/models/orders.entity';
import { OrdersService } from 'src/orders/service/orders.service';
import { Role } from 'src/users/models/roles.enum';
import { CreateOrderDTO } from '../models/create-order.dto';

@Controller('carts')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }
  @Roles(Role.MANAGER)
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

  @Roles(Role.CLIENT)
  @Post(':cartId/products/:productId')
  create(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
    @Body() body: CreateOrderDTO,
  ): Promise<Order> {
    return this.ordersService.create(cartId, productId, body);
  }
}
