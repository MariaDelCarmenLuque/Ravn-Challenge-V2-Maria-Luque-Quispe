import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Order } from 'src/orders/models/orders.entity';
import { OrdersService } from 'src/orders/service/orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }
    @Public()
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
}
