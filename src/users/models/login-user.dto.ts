import {  IsEmail, IsString } from "class-validator";

export class LogInUserDto {
    @IsString()
    password: string;

    @IsEmail()
    email: string;
}