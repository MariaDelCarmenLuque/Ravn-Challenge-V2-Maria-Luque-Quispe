import { IsInt, Min } from 'class-validator';

export class CreateOrderDTO {
  @Min(1)
  @IsInt()
  quantity?: number;
}