import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/create-user.dto';
import { UpdateUserDto } from '../models/update-user.dto';
import { User } from '../models/user.entity';

    @Injectable()
    export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async getAll() {
        return await this.usersRepository.find();
      }
    

    async findOne(id: number): Promise<User> {
        return await this.usersRepository.findOne(id);
      }
    

    create(user: CreateUserDto) {
        const newUser:User = this.usersRepository.create(user);

        return this.usersRepository.save(newUser);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
        const user: User = await this.usersRepository.findOne(id);

        this.usersRepository.merge(user, updateUserDto);

        this.usersRepository.save(user);
    }
    
    async findOneByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({ email });
      }
    
    async findPassword(id: number): Promise<string> {
        const foundUser = await this.usersRepository.findOne(id, {
            select: ['password'],
        });
        return foundUser.password;
    }
    
}
