import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./roles.enum";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint',
    })
    id: number;

    @Column({
        name: 'roles',
        type: 'enum',
        nullable:false,
        enum: Role,
    })
    role: Role;

    @Column({
        name: 'first_name',
        type: 'character varying',
        length: 50,
        nullable: true,
    })
    firstName: string;
    
    @Column({
        name: 'last_name',
        type: 'character varying',
        length: 50,
        nullable: true,
    })
    lastName: string;
    
    @Column({
        name: 'phone',
        type: 'character varying',
        length: 50,
        nullable: true,
    })
    phone: string;

    @Column({
        name: 'email',
        type: 'character varying',
        length: 100,
        nullable: false,
    })
    email: string;

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
    address: string;
    
    @Column({
        name: 'gender',
        type: 'character varying',
        length: 15,
        nullable: true,
    })
    gender: string;
    
    @Column({
        name: 'birth_date',
        type: 'timestamptz',
        nullable: true,
    })
    birthDate: Date;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        default: null,
    })
    deletedAt?: Date;
    
}