import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateCartItemDTO {
  @Min(1)
  @IsInt()
  @ApiProperty({
    description: 'The products quantity',
    type: Number,
    minimum: 1,
  })
  quantity?: number;
}
