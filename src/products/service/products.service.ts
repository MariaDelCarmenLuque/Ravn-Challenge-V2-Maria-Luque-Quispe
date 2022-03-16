import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Category } from 'src/categories/category.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../models/create-product.dto';
import { Product } from '../models/product.entity';
import { UpdateProductDto } from '../models/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ){}

    async getAll(options: IPaginationOptions, categoryId?: number):Promise <Pagination<Product>>{
        if(categoryId){
            return paginate<Product>(this.productsRepository, options, {
            
            relations: ['category'],
            where: {
              category: categoryId },
            }
          );
        } else return paginate<Product>(this.productsRepository, options,{
            relations: ['category','images'],
        });
        
    }

    async findOne(id:number):Promise<Product>{
        return this.productsRepository.findOne(id,{
            relations:['category'],
        });
    }
    async create(body:CreateProductDto):Promise<Product>{
        const newProduct = this.productsRepository.create(body)
        const category: Category = await this.categoriesRepository.findOne(
            body.categoryId,
          );
      
          if (!category) {
            throw new UnprocessableEntityException('Category does not exist');
          }
      
          newProduct.category = category;
        return this.productsRepository.save(newProduct);
    }

    async update(id: number, updateProductDTO: UpdateProductDto): Promise<void> {
        const product:Product = await this.productsRepository.findOne(id);
    
        this.productsRepository.merge(product, updateProductDTO);
    
        this.productsRepository.save(product);


    }

    async delete(id:number){
        return await this.productsRepository.softDelete(id);
    }
    

}
