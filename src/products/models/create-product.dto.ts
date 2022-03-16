import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 40)
  @ApiProperty({
    example: 'Chocolate cake',
    description: 'Product name',
  })
  name: string;

  @IsString()
  @Length(1, 1000)
  @ApiProperty({
    example: 'Chocolate cake contains a variety of dried fruits',
    description: 'Product description',
  })
  description: string;

  @IsNumber()
  @Min(1)
  @Max(1000000)
  @ApiProperty({
    example: 10,
    description: 'Product Stock',
  })
  stock: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @ApiProperty({
    example: 1050.5,
    description: 'Product Price',
  })
  price: number;

  @IsNumber()
  @Max(300)
  @ApiProperty({
    description: 'Id of the Product category',
    example: 1,
  })
  categoryId: number;
}
