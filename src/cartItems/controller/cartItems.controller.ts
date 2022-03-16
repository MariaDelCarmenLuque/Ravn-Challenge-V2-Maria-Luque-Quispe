import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';


import { CartItem } from 'src/cartItems/models/cartItems.entity';
import { CartItemsService } from 'src/cartItems/service/cartItems.service';
import { Role } from 'src/users/models/roles.enum';
import { CreateCartItemDTO } from '../models/create-cart-item.dto';

@ApiTags('Cart Items')
@Controller('carts')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {
  }


  @ApiOperation({ summary: 'Get all cart items' })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged as Manager User',
  })
  @ApiResponse({
    status: 200,
    description: 'List with all cart items',
    type: [CartItem],
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
    ): Promise<CartItem[]> {
      const cartItems: CartItem[] = await this.cartItemsService.findAllFromCart(cartId);
      if(!cartItems){
          throw new HttpException('Cart Items Not Found',HttpStatus.BAD_REQUEST)
      }
      return cartItems;
    }

  @ApiOperation({ summary: 'Create a Cart Item' })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged as Client User',
  })
  @ApiResponse({
    status: 201,
    description: 'Cart Item successfully created',
    type: CartItem,
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
    @Body() body: CreateCartItemDTO,
  ): Promise<CartItem> {
    return this.cartItemsService.create(cartId, productId, body);
  }
}
