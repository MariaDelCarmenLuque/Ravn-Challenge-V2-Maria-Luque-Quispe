import { Body, Controller, DefaultValuePipe, Get, HttpCode, ParseIntPipe, Post, Query, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/models/roles.enum';
import { CreateImageDto } from '../models/create-image.dto';
import { Images } from '../models/images.entity';
import { ImagesService } from '../service/images.service';

@ApiTags('Images')
@ApiBearerAuth()
@Controller('images')
export class ImagesController {
    constructor(
        private readonly imagesService: ImagesService,
        ) {}

        /**
         * 
         * @param page - Page of the result
         * @param limit - Max mount of products per page
         * @returns Filtered products accord to preceding criteria
         */
    @ApiOperation({ summary: 'Get all images' })
    @ApiQuery({
        required: false,
        name: 'limit',
        description: 'Max amount of images per page',
        example: 10,
    })
    @ApiQuery({
        required: false,
        name: 'page',
        description: 'Page of the result',
        example: 1,
    })
    @ApiResponse({
      status: 200,
      description: 'Returns all images',
      type: Images,
    })
    @ApiBearerAuth()
    @Public()
    @Get('')
    @HttpCode(200)
    findAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ) :Promise<Pagination<Images>>{
      limit = limit > 100 ? 100 : limit;
      return this.imagesService.getAll(
        {
            page,
            limit,
            route: '/images',
        });
    }

    @ApiOperation({ summary: 'Create a Image' })
    @ApiResponse({
        status: 201,
        description: 'Image created successfully',
        type: Images,
    })
    @ApiUnauthorizedResponse({
        schema: {
        example: new UnauthorizedException().getResponse(),
        },
        description: 'User is not logged in as Manager',
    })
    @ApiUnprocessableEntityResponse({
        description: 'The productId supplied does not exist',
        schema: {
        example: new UnprocessableEntityException(
            'Product does not exist',
        ).getResponse(),
        },
    })
    @ApiBearerAuth()
    @Roles(Role.MANAGER)
    @Post()
    async create(@Body() createImageDTO:CreateImageDto): Promise<Images>{
        return await this.imagesService.create(createImageDTO);
    }
}
