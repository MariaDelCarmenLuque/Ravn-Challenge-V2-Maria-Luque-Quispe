import { Body, Controller,  Get, Param, Patch, Req } from '@nestjs/common';
import { UpdateUserDto } from '../models/update-user.dto';
import { User } from '../models/user.entity';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

@Get('')
async getAll(){
  return await this.userService.getAll();
}


@Get()
async findLoggedUser(@Req() req): Promise<User> {
    const id = req.user.id;

    return await this.userService.findOne(id);

}
@Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);


}

@Patch()
async updateUserData(
  @Req() req,
  @Body() updateUserDTO: UpdateUserDto,
): Promise<void> {
  await this.userService.update(req.user.id, updateUserDTO);
}

  
}
