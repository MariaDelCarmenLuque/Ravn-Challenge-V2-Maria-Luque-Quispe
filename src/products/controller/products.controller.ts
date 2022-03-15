import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/models/roles.enum';
import { CreateProductDto } from '../models/create-product.dto';
import { Product } from '../models/product.entity';
import { UpdateProductDto } from '../models/update-product.dto';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ){}

    @Public()
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

    @Public()
    @Get(':id')
    async findOne(@Param('id')id:number): Promise<Product> {
    
        return await this.productsService.findOne(id);
    }

    @Roles(Role.MANAGER)
    @Post()
    async create(@Body() createProductDTO:CreateProductDto): Promise<Product>{
        return await this.productsService.create(createProductDTO);
    }

    @Roles(Role.MANAGER)
    @Patch(':id')
    async updateProductById(@Param('id') id: number,@Body() updateProductDTO: UpdateProductDto): Promise<void>{
        const product:Product = await this.productsService.findOne(id);
        if(product){
            await this.productsService.update(id,updateProductDTO);
        } else {
            throw new HttpException('Product Not Found',HttpStatus.BAD_REQUEST);
        }
    }

    @Roles(Role.MANAGER)
    @Patch(':id')
    async disableProduct(){
        /**
         * Implement code of disableProduct()
         * */
        return ""}

    @Roles(Role.MANAGER)
    @Delete(':id')
    async delete(@Param('id') id:number){
        const product:Product = await this.productsService.findOne(id);
        if(product){
            await this.productsService.delete(id);
        } else {
            throw new HttpException('Product Not Found',HttpStatus.BAD_REQUEST);
        }
        return HttpStatus.OK;
    }

}
