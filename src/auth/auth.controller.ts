import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
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
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
  })
  @ApiBadRequestResponse({
    description: 'One or more properties are missing or are wrong.',
  })
  @Public()
  @Post('signUp')
  async register(@Body() user: CreateUserDto) {
    await this.authService.checkEmail(user);

    await this.authService.create(user);
  }

  @ApiOperation({
    summary: 'Log in',
  })
  @ApiCreatedResponse({
    description: 'User logged.',
    schema: {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoibWFuYWdlciIsImVtYWlsIjoibWFyaXRjYXJtbkBnbWFpbC5jb20iLCJpYXQiOjE2NDcyODc4MjZ9.YWBlLV34dv780eNHchXDf1lsSXYANf678ZfVN-D2dNU',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'One or more properties are missing or are wrong.',
  })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('signIn')
  async login(@Body() user: LogInUserDto, @Req() req) {
    return this.authService.login(req.user, user.password);
  }
}
