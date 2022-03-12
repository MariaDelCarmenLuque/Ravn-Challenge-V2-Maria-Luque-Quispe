import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../models/create-product.dto';
import { Product } from '../models/product.entity';
import { UpdateProductDto } from '../models/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ){}

    async getAll(){
        return await this.productsRepository.find();
    }
    async findOne(id:number):Promise<Product>{
        return this.productsRepository.findOne(id);
    }
    create(product:CreateProductDto):Promise<Product>{
        const newProduct:Product = this.productsRepository.create(product)
        return this.productsRepository.save(newProduct);
    }

    async update(id: number, updateProductDTO: UpdateProductDto): Promise<void> {
        const product:Product = await this.productsRepository.findOne(id);
    
        this.productsRepository.merge(product, updateProductDTO);
    
        this.productsRepository.save(product);
    }

    async delete(id:number){
        return await this.productsRepository.delete(id);
    }
    

}
