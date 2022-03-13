import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from '../category.entity';
import { CategoriesService } from '../service/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get('')
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<Category>>{
        limit = limit > 100 ? 100 : limit;
        return this.categoriesService.getAll({
          page,
          limit,
          route: '/categories',
        });
    }

    @Get(':id')
    async findOne(@Param('id')id:number): Promise<Category> {
    return await this.categoriesService.findOne(id);
    }

    @Post()
    async create(@Body() body: Category): Promise<Category>{
        return await this.categoriesService.create(body);
    }
}
