import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './roles.enum';
import { Exclude } from 'class-transformer';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'bigint',
  })
  @ApiProperty({
    readOnly: true,
    type: Number,
    example: 1,
    description: 'User ID',
  })
  id: number;

  @Column({
    name: 'roles',
    type: 'enum',
    nullable: false,
    enum: Role,
  })
  @ApiProperty({
    example: 'Manager',
    description: 'User Role (Client or Manager)',
    nullable: false,
    type: Role,
  })
  role: Role;

  @Column({
    name: 'first_name',
    type: 'character varying',
    length: 50,
    nullable: true,
  })
  @ApiProperty({
    name: 'firstName',
    description: 'Firstname of User',
    type: String,
    nullable: true,
    example: 'Maria',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'character varying',
    length: 50,
    nullable: true,
  })
  @ApiProperty({
    name: 'lastName',
    description: 'Firstname of User',
    type: String,
    nullable: true,
    example: 'Luque',
  })
  lastName: string;

  @Column({
    name: 'phone',
    type: 'character varying',
    length: 50,
    nullable: true,
  })
  @ApiProperty({
    name: 'phone',
    description: 'Phone number of User',
    type: String,
    nullable: true,
    example: '+5198765432',
  })
  phone: string;

  @Column({
    name: 'email',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  @ApiProperty({
    name: 'email',
    description: 'Email of User',
    type: String,
    nullable: false,
    example: 'maria@dessertstore.com',
  })
  email: string;

  @ApiHideProperty()
  @Column({
    name: 'password',
    type: 'character varying',
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    name: 'address',
    type: 'character varying',
    length: 200,
    nullable: true,
  })
  @ApiProperty({
    name: 'address',
    type: String,
    example: '475 colibri,CABA',
  })
  address: string;

  @Column({
    name: 'gender',
    type: 'character varying',
    length: 15,
    nullable: true,
  })
  @ApiProperty({
    name: 'gender',
    type: String,
    example: 'Female',
  })
  gender: string;

  @Column({
    name: 'birth_date',
    type: 'timestamptz',
    nullable: true,
  })
  @ApiProperty({
    name: 'birthDate',
    type: Date,
    example: '01/01/1990',
  })
  birthDate: Date;

  @ApiHideProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @ApiHideProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @ApiHideProperty()
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  @Exclude({ toPlainOnly: true })
  deletedAt?: Date;
}
