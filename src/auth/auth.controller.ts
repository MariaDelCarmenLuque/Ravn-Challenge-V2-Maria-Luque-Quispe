import { Body, Controller, Post, Req } from '@nestjs/common';
import { LogInUserDto } from 'src/users/models/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

@Post('login')
async login(@Body() user: LogInUserDto, @Req() req) {
    return this.authService.login(req.user, user.password);
  }

    
}
