import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('items')
export class Product {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint',
    })
    id: number;

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

    @Column({
        name: 'name',
        type: 'character varying',
        length: 100,
        nullable: false,
    })
    name: string;

    @Column({
        name: 'description',
        type: 'character varying',
        length: 1000,
        nullable: false,
    })
    description: string;

    @Column({
        name: 'price',
        type: 'float',
        nullable: false,
    })
    price: number;

    @Column({
        name: 'stock',
        type: 'int',
        nullable: false,
    })
    stock: number;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
      })
    deletedAt?: Date;

    // RELATIONS
    // cart
    // categories
}