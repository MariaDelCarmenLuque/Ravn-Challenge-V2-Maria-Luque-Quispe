import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

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
}
