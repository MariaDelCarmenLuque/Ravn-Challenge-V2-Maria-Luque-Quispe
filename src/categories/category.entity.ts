import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({
    readOnly: true,
    type: Number,
    example: 1,
    description: 'Category ID',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  @ApiProperty({
    type: String,
    maxLength: 100,
    description: 'Name of the category',
    example: 'Cake',
    nullable: false,
  })
  name: string;
}
