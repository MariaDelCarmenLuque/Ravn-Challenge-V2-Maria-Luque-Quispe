import { Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { CreateProductDto } from '../models/create-product.dto';
import { Product } from '../models/product.entity';
import { UpdateProductDto } from '../models/update-product.dto';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ){}


    @Get()
    async findAll():Promise<Product[]>  {
    
        return this.productsService.getAll();
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
