import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/models/roles.enum';
import { Cart } from '../entity/cart.entity';
import { CartService } from '../service/cart.service';

@ApiTags('Carts')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: 'Gets all carts',
  })
  @ApiResponse({
    status: 201,
    description: 'Listing all Carts',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBearerAuth()
  @Roles(Role.MANAGER)
  @Get('')
  async getAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Roles(Role.MANAGER)
  @Get('orders/:userId')
  async getAllOrderForClient(@Param('userId') userId: number): Promise<Cart[]> {
    const carts: Cart[] = await this.cartService.findAllForClient(userId);
    if (!carts) {
      throw new NotFoundException('Cart Item for client not found');
    }
    return carts;
  }

  @ApiOperation({
    summary: 'Gets one cart by Id',
  })
  @ApiResponse({
    status: 201,
    description: 'Cart succesfully found',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No Cart was found that matches that id',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    required: true,
  })
  @ApiBearerAuth()
  @Roles(Role.MANAGER)
  @Get(':id')
  async getCart(@Param('id') id: number): Promise<Cart> {
    const cart = await this.cartService.findOne(id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  @Roles(Role.MANAGER)
  @Get(':id/orders')
  async getOrders(@Req() req, @Param('id') id: number) {
    const user = req.user;
    const cart = await this.cartService.findCartForUser(id, user.id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  @ApiOperation({
    summary: 'Creates cart',
  })
  @ApiResponse({
    status: 201,
    description: 'Cart succesfully created',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBearerAuth()
  @Roles(Role.MANAGER)
  @Post(':id/items')
  create(@Body() body: any): Promise<Cart> {
    return this.cartService.create(body);
  }
}
