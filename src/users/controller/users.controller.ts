import { Body, Controller,  DefaultValuePipe,  Get, HttpCode, Param, ParseIntPipe, Patch, Query, Req, UnauthorizedException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../models/roles.enum';
import { UpdateUserDto } from '../models/update-user.dto';
import { User } from '../models/user.entity';
import { UsersService } from '../service/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiOperation({
      summary: 'Get data of all Users',
    })
    @ApiBearerAuth()
    @ApiOkResponse({
      schema: {
        example: {
        
          "items": [
            {
                "id": "1",
                "role": "manager",
                "firstName": null,
                "lastName": null,
                "phone": null,
                "email": "maritcarmn@gmail.com",
                "address": null,
                "gender": null,
                "birthDate": null,
                "createdAt": "2022-03-14T19:56:36.796Z",
                "updatedAt": "2022-03-14T19:56:36.796Z",
                "deletedAt": null
            },
            {
                "id": "2",
                "role": "client",
                "firstName": null,
                "lastName": null,
                "phone": null,
                "email": "maritcarmn24@gmail.com",
                "address": null,
                "gender": null,
                "birthDate": null,
                "createdAt": "2022-03-16T03:42:52.413Z",
                "updatedAt": "2022-03-16T03:42:52.413Z",
                "deletedAt": null
            }
        ],
        "meta": {
            "totalItems": 2,
            "itemCount": 2,
            "itemsPerPage": 10,
            "totalPages": 1,
            "currentPage": 1
        },
        "links": {
            "first": "/users/all?limit=10",
            "previous": "",
            "next": "",
            "last": "/users/all?page=1&limit=10"
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
        description: 'Max amount of users per page',
        example: 10,
    })
    @ApiUnauthorizedResponse({
      schema: {
      example: new UnauthorizedException().getResponse(),
      },
      description: 'User is not logged in as Manager',
  })
    @ApiBearerAuth()
    @Roles(Role.MANAGER)
    @Get('all')
    async getAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
      ): Promise<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;

      return await this.userService.getAll(
        {
          page,
          limit,
          route: '/users/all',
      },);
    }


    @ApiOperation({
      summary: 'Get logged User data',
    })  
    @ApiOkResponse({
      status:200,
      description:'Data of User Logged',
      schema:{
        example:
        {
          "id": "1",
          "role": "manager",
          "firstName": null,
          "lastName": null,
          "phone": null,
          "email": "maritcarmn@gmail.com",
          "address": null,
          "gender": null,
          "birthDate": null,
          "createdAt": "2022-03-14T19:56:36.796Z",
          "updatedAt": "2022-03-14T19:56:36.796Z",
          "deletedAt": null
        }
      }
    })
    @ApiBearerAuth()
    @Get()
    @HttpCode(200)
    async findLoggedUser(@Req() req): Promise<User> {
      const id = req.user.id;

      return await this.userService.findOne(id);

    }



    @ApiOperation({
      summary: 'Get data of a given User',
    })
    @ApiOkResponse({
      status:200,
      description:'Data of User Logged',
      schema:{
        example:
        {
          "id": "1",
          "role": "manager",
          "firstName": null,
          "lastName": null,
          "phone": null,
          "email": "maritcarmn@gmail.com",
          "address": null,
          "gender": null,
          "birthDate": null,
          "createdAt": "2022-03-14T19:56:36.796Z",
          "updatedAt": "2022-03-14T19:56:36.796Z",
          "deletedAt": null
        }
      }
    })
    @ApiNotFoundResponse({
      description: 'User Not Found',
      schema: {
        example: {
            "statusCode": 404,
            "message": "User Not Found"
          },
      },
    })
    @ApiUnauthorizedResponse({
      schema: {
        example: new UnauthorizedException().getResponse(),
      },
      description: 'User is not logged in as Manager',
    })
    @ApiParam({
      name: 'id',
      description: 'User ID',
      type: Number,
      required: true,
      example: 1,
    })
    @ApiBearerAuth()
    @Roles(Role.MANAGER)
    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id') id: number): Promise<User> {
      return await this.userService.findOne(id);
    }

    @ApiOperation({
      summary: 'Edit data of a given User',
    })
    @ApiNoContentResponse({
      description: 'The user data has been successfully updated.',
    })
    @ApiParam({
      name: 'id',
      description: 'User ID',
      type: Number,
      required: true,
      example: 1,
    })
    @ApiBearerAuth()
    @Roles(Role.MANAGER)
  
    @Patch(':id')
    @HttpCode(201)
    async updateUserData(
      @Req() req,
      @Body() updateUserDTO: UpdateUserDto,
    ): Promise<void> {
      await this.userService.update(req.user.id, updateUserDTO);
    }

      
}
