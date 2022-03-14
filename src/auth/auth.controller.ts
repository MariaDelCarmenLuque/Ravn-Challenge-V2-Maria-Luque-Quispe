import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/users/models/create-user.dto';
import { LogInUserDto } from 'src/users/models/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
@Post('register')
async register(@Body() user: CreateUserDto) {
    await this.authService.checkEmail(user);

    await this.authService.create(user);
}
  

@Post('login')
async login(@Body() user: LogInUserDto, @Req() req) {
    return this.authService.login(req.user, user.password);
  }

    
}
