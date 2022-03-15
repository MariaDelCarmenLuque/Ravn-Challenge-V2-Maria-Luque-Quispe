import { Controller, Get} from '@nestjs/common';
import { Cart } from '../entity/cart.entity';
import { CartService } from '../service/cart.service';

@Controller('carts')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) {}
    
   
    @Get('')
    async getAll(): Promise<Cart[]> {
       return this.cartService.findAll();
    }
}
