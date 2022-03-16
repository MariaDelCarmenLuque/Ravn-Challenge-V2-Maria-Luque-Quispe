import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/models/roles.enum';
import { Category } from '../category.entity';
import { CategoriesService } from '../service/categories.service';
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @ApiOperation({ summary: 'Returns all available categories' })
    @ApiOkResponse({
      status: 200,
      description: 'Categories availables list',
      schema: {
        example: {
            "items": [
                {
                    "id": 1,
                    "name": "cakes"
                },
                {
                    "id": 2,
                    "name": "cupcakes"
                },
                {
                    "id": 3,
                    "name": "cheesecake"
                },
                {
                    "id": 4,
                    "name": "cookies"
                },
                {
                    "id": 5,
                    "name": "brownies"
                },
                {
                    "id": 6,
                    "name": "cream"
                },
            ],
            "meta": {
                "totalItems": 6,
                "itemCount": 6,
                "itemsPerPage": 10,
                "totalPages": 1,
                "currentPage": 1
            },
            "links": {
                "first": "/categories?limit=10",
                "previous": "",
                "next": "",
                "last": ""
            }
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
        description: 'Max amount of categories per page',
        example: 10,
    })
    @ApiBearerAuth()
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

    @ApiOperation({ summary: 'Get a single category by ID' })
    @ApiResponse({
        status: 200,
        description: 'Category found by ID',
        schema:{
            example: {
                "id": 5,
                "name": "Brownies"
            },
        }
    })
    @ApiNotFoundResponse({
        description: 'Product Not Found',
        schema: {
          example:{
            "statusCode": 404,
            "message": "Category with id 11111 Not found",
            "error": "Not Found"
          },
        },
      })
    @ApiBearerAuth()
    @Public()
    @Get(':id')
    async findOne(@Param('id')id:number): Promise<Category> {
    return await this.categoriesService.findOne(id);
    }


    @ApiOperation({ summary: 'Create a Category' })
    @ApiResponse({
        status: 201,
        description: 'Category created successfully',
        type: Category,
    })
    @ApiUnauthorizedResponse({
        schema: {
        example: new UnauthorizedException().getResponse(),
        },
        description: 'User is not logged in as Manager',
    })
    @ApiBearerAuth()
    @Roles(Role.MANAGER)
    @Post()
    async create(@Body() body: Category): Promise<Category>{
        return await this.categoriesService.create(body);
    }
}
