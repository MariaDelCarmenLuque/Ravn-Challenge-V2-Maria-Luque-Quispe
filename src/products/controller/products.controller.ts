import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateProductDto } from '../models/create-product.dto';
import { Product } from '../models/product.entity';
import { UpdateProductDto } from '../models/update-product.dto';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ){}


    @Get('')
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ):Promise<Pagination<Product>>  {
        limit = limit > 100 ? 100 : limit;
        return this.productsService.getAll({
            page,
            limit,
            route:'/products',
        });
    }

    @Get(':id')
    async findOne(@Param('id')id:number): Promise<Product> {
    
        return await this.productsService.findOne(id);
    }
    @Post()
    async create(@Body() createProductDTO:CreateProductDto): Promise<Product>{
        return await this.productsService.create(createProductDTO);
    }

    @Patch(':id')
    async update(@Param('id') id: number,@Body() updateProductDTO: UpdateProductDto): Promise<void>{
        return await this.productsService.update(id,updateProductDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id:number){
        return this.productsService.delete(id);
    }

}
