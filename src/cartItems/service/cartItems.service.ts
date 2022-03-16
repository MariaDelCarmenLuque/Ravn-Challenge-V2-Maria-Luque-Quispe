import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/products/models/product.entity';
import { Repository } from 'typeorm';
import { CartItem } from '../models/cartItems.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemsRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
    @InjectRepository(Cart)
    private readonly cartsRepository: Repository<Cart>,
) {}

  async findAllFromCart(cartId: number): Promise<CartItem[]> {
      return await this.cartItemsRepository.find({
        where:{cartId: cartId},
      });
  }


  async create(cartId: number, productId: number, body: any): Promise<CartItem> {

    const product = await this.products.findOne(productId);
    if(!product){
      throw new HttpException('Product Not Found',HttpStatus.NOT_FOUND)
    }
    if (!product.isActive()) {
      throw new ForbiddenException('This product has been disable');
    }

    if (!product.isAvailable(body.quantity)) {
      throw new ForbiddenException('Required quantity not available');
    }
    const subtotal = product.getFinalPrice(body.quantity);
    body.subtotal=subtotal,
    this.cartItemsRepository.merge({ ...body, subtotal }, { cartId, productId })
    return this.cartItemsRepository.save(body);
  }


}
