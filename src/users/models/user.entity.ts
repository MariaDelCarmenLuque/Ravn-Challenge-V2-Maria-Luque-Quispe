import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./roles.enum";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
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
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    firstName: string;
    
    @Column({
        name: 'last_name',
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    lastName: string;
    
    @Column({
        name: 'phone',
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    phone: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 100,
        nullable: false,
        select: false,
      })
    password: string;
    
    @Column({
        name: 'address',
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    address: string;
    
    @Column({
        name: 'gender',
        type: 'varchar',
        length: 15,
        nullable: true,
    })
    gender: string;
    
    @Column({
        name: 'birth_date',
        type: 'timestamp',
        nullable: true,
    })
    birthDate: Date;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        default: null,
    })
    deletedAt: Date;
    
}