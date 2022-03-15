import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/models/product.entity';
import { Repository } from 'typeorm';
import { Order } from '../models/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
) {}

  findAllFromCart(cartId: number): Promise<Order[]> {
      return this.orderRepository.find({
        cartId: cartId,
      });
  }

  async create(cartId: number, productId: number, body: any): Promise<Order> {

    const product = await this.products.findOne(productId);

    if (!product.isActive()) {
      throw new ForbiddenException('This product has been disable');
    }

    if (!product.isAvailable(body.quantity)) {
      throw new ForbiddenException('Required quantity not available');
    }

    const price = product.getFinalPrice();

    this.orderRepository.merge({ ...body, price }, { cartId, productId });

    return this.orderRepository.save(body);
  }


}
