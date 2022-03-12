import { IsNumber, IsString, Length, Max, Min } from "class-validator"

export class CreateProductDto {
    @IsString()
    @Length(1,100)
    name: string;

    @IsString()
    @Length(1,1000)
    description: string;

    @IsString()
    @Length(1,1000)
    imageUrl: string;

    @IsNumber()
    @Min(1)
    @Max(1000000)
    stock: number;
    
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;

    @IsNumber()
    @Max(300)
    categoryId: number;
   
}
