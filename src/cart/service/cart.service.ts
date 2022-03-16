import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { Cart } from '../entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>){}

    async findAll(): Promise<Cart[]> {
      
        return this.cartRepository.find({
          relations: ['items'],
        });
    }

    async findAllForClient(userId:number): Promise<Cart[]> {

      return this.cartRepository.find({
        relations: ['items'],
        where: {user:userId}
      });
  }
    async findCartForUser(cartId:number,userId: number): Promise<Cart> {
      const cart = await this.cartRepository.findOne({
        where: { user: { id: userId },id:cartId },
        relations: ['user','items'],
        order: { id: 'DESC' },
      });
      return cart;
    }

    async findOne(cartId:number): Promise<Cart> {
      const cart = await this.cartRepository.findOne({
        where: { id:cartId },
        relations: ['user','items'],
        order: { id: 'DESC' },
      });
      return cart;
    }

    create(user: User): Promise<Cart> {
      const newCart = this.cartRepository.create({
        user,
      });
  
      return this.cartRepository.save(newCart);
    }
}
