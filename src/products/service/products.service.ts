import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
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

    async getAll(options: IPaginationOptions):Promise <Pagination<Product>>{
        return paginate<Product>(this.productsRepository, options,{
            relations:['category'],
        });
    }

    async findOne(id:number):Promise<Product>{
        return this.productsRepository.findOne(id);
    }
    create(body:CreateProductDto):Promise<Product>{
        const newProduct = this.productsRepository.create(body)
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
