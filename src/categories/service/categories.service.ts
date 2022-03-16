import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Category } from '../category.entity';

@Injectable()
export class CategoriesService {
    
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository:Repository<Category> 
        ){}

    async getAll(options: IPaginationOptions):Promise <Pagination<Category>>{
        return paginate<Category>(this.categoriesRepository, options,{

        });
    }

    async findOne(id:number):Promise<Category>{
        const category = await this.categoriesRepository.findOne(id,{
            where: {
                id: id,
            },
        });
        if(!category){
            throw new NotFoundException(`Category with id ${id} Not Found`);
        }
        return category;
    }

    create(body:Category):Promise<Category>{
        const newCategory = this.categoriesRepository.create(body)
        return this.categoriesRepository.save(newCategory);
    }
}
