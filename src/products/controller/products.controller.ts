import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/models/roles.enum';
import { CreateProductDto } from '../models/create-product.dto';
import { Product } from '../models/product.entity';
import { UpdateProductDto } from '../models/update-product.dto';
import { ProductsService } from '../service/products.service';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * @todo add authorization
   * @param page - Page of the result
   * @param limit - Max mount of products per page
   * @returns Filtered products accordi to preceding criteria
   */

  @ApiOperation({ summary: 'Get all products with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'A paginated product list',
    schema: {
      example: {
        items: [
          {
            id: '1',
            createdAt: '2008-06-02T14:59:59.000Z',
            updatedAt: '2022-03-14T16:27:23.600Z',
            name: 'CAKE1',
            description: 'Description Cake1',
            imageUrl:
              "['https://site/subsite/documentlibrary/Desserts.jpg','https://site/subsite/documentlibrary/Desserts.jpg']",
            price: 230,
            stock: 15,
            status: 'active',
            deletedAt: null,
            category: {
              id: 1,
              name: 'cakes',
            },
          },
          {
            id: '2',
            createdAt: '2008-06-03T14:59:59.000Z',
            updatedAt: '2022-03-14T16:27:23.600Z',
            name: 'CAKE2',
            description: 'Cake2',
            imageUrl: 'asdfas',
            price: 200,
            stock: 10,
            status: 'disable',
            deletedAt: null,
            category: {
              id: 1,
              name: 'cakes',
            },
          },
          {
            id: '3',
            createdAt: '2021-06-24T14:59:59.000Z',
            updatedAt: '2022-03-14T16:27:23.600Z',
            name: 'CAKE3',
            description: 'Cake3',
            imageUrl:
              "['https://site/subsite/documentlibrary/Desserts.jpg','https://site/subsite/documentlibrary/Desserts.jpg']",
            price: 200,
            stock: 10,
            status: 'active',
            deletedAt: null,
            category: {
              id: 2,
              name: 'cupcakes',
            },
          },

          {
            id: '4',
            createdAt: '2008-06-02T14:59:59.000Z',
            updatedAt: '2022-03-14T16:30:57.618Z',
            name: 'CUPCAKE1',
            description: 'Description CUPCake1',
            imageUrl:
              "['https://site/subsite/documentlibrary/Desserts.jpg','https://site/subsite/documentlibrary/Desserts.jpg']",
            price: 230,
            stock: 15,
            status: 'active',
            deletedAt: null,
            category: {
              id: 2,
              name: 'cupcakes',
            },
          },
        ],
        meta: {
          totalItems: 4,
          itemCount: 4,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: '/products?limit=10',
          previous: '',
          next: '',
          last: '',
        },
      },
    },
  })
  @ApiQuery({
    required: false,
    name: 'page',
    description: 'Page of the result',
    example: 1,
  })
  @ApiQuery({
    required: false,
    name: 'limit',
    description: 'Max amount of products per page',
    example: 10,
  })
  @ApiQuery({
    name: 'category',
    type: 'number',
    description: 'Category ID',
    required: false,
    example: 1,
  })
  @ApiBearerAuth()
  @Public()
  @Get('')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('category') categoryId?: number,
  ): Promise<Pagination<Product>> {
    limit = limit > 100 ? 100 : limit;
    return this.productsService.getAll(
      {
        page,
        limit,
        route: '/products',
      },
      categoryId,
    );
  }

  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found by ID',
    schema: {
      example: {
        id: '1',
        createdAt: '2008-06-02T14:59:59.000Z',
        updatedAt: '2022-03-14T16:27:23.600Z',
        name: 'CAKE1',
        description: 'Description Cake1',
        imageUrl: '["https://site/subsite/documentlibrary/Desserts.jpg"]',
        price: 230,
        stock: 15,
        status: 'active',
        deletedAt: null,
        category: {
          id: 1,
          name: 'cakes',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product Not Found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Product with id 12344 Not found',
      },
    },
  })
  @Public()
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number): Promise<Product> {
    const product: Product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException(
        `Product with id ${id} Not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  @ApiOperation({ summary: 'Create a Product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    schema: {
      example: new BadRequestException([
        'Name must be longer than or equal to 50 characters',
      ]).getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in as Manager',
  })
  @ApiUnprocessableEntityResponse({
    description: 'The categoryId supplied does not exist',
    schema: {
      example: new UnprocessableEntityException(
        'Category does not exist',
      ).getResponse(),
    },
  })
  @ApiBearerAuth()
  @Roles(Role.MANAGER)
  @Post()
  async create(@Body() createProductDTO: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDTO);
  }

  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiBody({ type: UpdateProductDto, required: false })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    schema: {
      example: HttpStatus.OK,
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    schema: {
      example: new BadRequestException([
        'title must be longer than or equal to 1 characters',
      ]).getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to update this product',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Product Not Found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Product Not Found',
      },
    },
  })
  @ApiBearerAuth()
  @Roles(Role.MANAGER)
  @Patch(':id')
  @HttpCode(200)
  async updateProductById(
    @Param('id') id: number,
    @Body() updateProductDTO: UpdateProductDto,
  ): Promise<void> {
    const product: Product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    return await this.productsService.update(id, updateProductDTO);
  }

  @Roles(Role.MANAGER)
  @Patch(':id/status')
  async disableProduct() {
    /**
     * Implement code of disableProduct()
     * */
    return '';
  }

  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product deleted sucessfully',
    schema: {
      example: '200',
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to delete this product',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Product Not Found',
    schema: {
      example: new NotFoundException('Product not found').getResponse(),
    },
  })
  @ApiBearerAuth()
  @Roles(Role.CLIENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const product: Product = await this.productsService.findOne(id);
    if (product) {
      await this.productsService.delete(id);
    } else {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
    return HttpStatus.OK;
  }
}
