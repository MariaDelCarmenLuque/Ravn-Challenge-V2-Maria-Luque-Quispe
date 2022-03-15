import { Body, Controller,  DefaultValuePipe,  Get, HttpCode, Param, ParseIntPipe, Patch, Query, Req } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../models/roles.enum';
import { UpdateUserDto } from '../models/update-user.dto';
import { User } from '../models/user.entity';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

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


    @Get()
    async findLoggedUser(@Req() req): Promise<User> {
      const id = req.user.id;

      return await this.userService.findOne(id);

    }

    @Roles(Role.MANAGER)
    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id') id: number): Promise<User> {
      return await this.userService.findOne(id);


    }

    @Patch()
    @HttpCode(201)
    async updateUserData(
      @Req() req,
      @Body() updateUserDTO: UpdateUserDto,
    ): Promise<void> {
      await this.userService.update(req.user.id, updateUserDTO);
    }

      
}
