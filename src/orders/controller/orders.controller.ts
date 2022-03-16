import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';


import { Order } from 'src/orders/models/orders.entity';
import { OrdersService } from 'src/orders/service/orders.service';
import { Role } from 'src/users/models/roles.enum';
import { CreateOrderDTO } from '../models/create-order.dto';

@ApiTags('Orders')
@Controller('carts')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }


  @ApiOperation({ summary: 'Get all orders' })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged as Manager User',
  })
  @ApiResponse({
    status: 200,
    description: 'List with all orders',
    type: [Order],
  })
  @ApiForbiddenResponse({ 
    status: 403, 
    description: 'Forbidden.',
    schema:{
      example:
      {
        "statusCode": 403,
        "message": "Forbidden resource",
        "error": "Forbidden"
      }
    }
  })
  @ApiBearerAuth()
  @Roles(Role.MANAGER)
  @Get(':cartId/products')
  @HttpCode(200)
  async getAll(
      @Param('cartId') cartId: number,
    ): Promise<Order[]> {
      const orders: Order[] = await this.ordersService.findAllFromCart(cartId);
      if(!orders){
          throw new HttpException('Order Not Found',HttpStatus.BAD_REQUEST)
      }
      return orders;
    }

  @ApiOperation({ summary: 'Create a order' })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged as Client User',
  })
  @ApiResponse({
    status: 201,
    description: 'Order successfully created',
    type: Order,
  })
  @ApiNotFoundResponse({
    description: 'Product Not Found',
      schema: {
        example: {
            "statusCode": 404,
            "message": "Product Not Found"
          },
      },
  })
  @ApiForbiddenResponse({ 
    status: 403, 
    description: 'Forbidden.',
    schema:{
      example:{
        "statusCode": 403,
        "message": "Required quantity not available",
        "error": "Forbidden"
      }
    },
  })
  @ApiBearerAuth()
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
