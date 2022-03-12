import { IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    @Length(1,100)
    name: string;

    @IsOptional()
    @IsString()
    @Length(1,1000)
    description: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(1000000)
    stock: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;

}
