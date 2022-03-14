import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/models/create-user.dto';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ){}

    // validateUser() method for of retrieving a user and verifying the password
    async validateUser(email: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email.toLowerCase());

        if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
        }

        const userData = {
        id: user.id,
        role: user.role,
        email: user.email,
        };

        return userData;

      }
    async validatePassword(dbPassword, password): Promise<any> {
        const passwordMatch = await bcrypt.compare(password, dbPassword);
    
        if (!passwordMatch) {
          throw new HttpException('WRONG_PASSWORD', HttpStatus.FORBIDDEN);
        }
    }
    

    async login(user: User, receivedPassword:string) {
        const dbPassword = await this.usersService.findPassword(user.id);

        await this.validatePassword(dbPassword, receivedPassword);

        return {
            access_token: this.jwtService.sign({...user}),
        };
    }
    async checkEmail(user: CreateUserDto) {
        const userExists = await this.usersService.findOneByEmail(
          user.email.toLowerCase(),
        );
    
        if (userExists) {
          throw new HttpException(
            'User is already registered',
            HttpStatus.CONFLICT,
          );
        }
      }
    
    async create(user: CreateUserDto): Promise<void> {

        user.email = user.email.toLowerCase();
        user.password = await bcrypt.hash(user.password, 10);

        await this.usersService.create(user);
    }
    
}
