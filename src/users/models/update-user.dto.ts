import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    gender: string;

    @IsOptional()
    @IsString()
    birthDate: string;

}