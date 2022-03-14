import { Injectable } from '@nestjs/common';
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
}
