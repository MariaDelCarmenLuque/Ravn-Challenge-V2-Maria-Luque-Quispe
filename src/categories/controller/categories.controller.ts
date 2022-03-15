import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/models/roles.enum';
import { Category } from '../category.entity';
import { CategoriesService } from '../service/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Public()
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
    @Public()
    @Get(':id')
    async findOne(@Param('id')id:number): Promise<Category> {
    return await this.categoriesService.findOne(id);
    }

    @Roles(Role.MANAGER)
    @Post()
    async create(@Body() body: Category): Promise<Category>{
        return await this.categoriesService.create(body);
    }
}
