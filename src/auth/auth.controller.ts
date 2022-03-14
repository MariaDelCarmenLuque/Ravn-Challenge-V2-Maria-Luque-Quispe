import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ApiTags,
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOperation
  } from '@nestjs/swagger';
  
import { CreateUserDto } from 'src/users/models/create-user.dto';
import { LogInUserDto } from 'src/users/models/login-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
   
    @Public()
    @Post('signUp')
    async register(@Body() user: CreateUserDto) {
        await this.authService.checkEmail(user);

        await this.authService.create(user);
    }
    
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('signIn')
    async login(@Body() user: LogInUserDto, @Req() req) {
        return this.authService.login(req.user, user.password);
    }

        
}
