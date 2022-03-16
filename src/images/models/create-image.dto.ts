import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @Length(1, 1000)
  @ApiProperty({
    example:
      '["https://site/subsite/documentlibrary/Desserts.jpg","https://site/subsite/documentlibrary/Desserts.jpg","https://site/subsite/documentlibrary/Desserts.jpg"]',
    description: 'URL image',
  })
  url: string;

  @IsNumber()
  @ApiProperty({
    description: 'Id of the Image of Product ',
    example: 1,
  })
  productId: number;
}
