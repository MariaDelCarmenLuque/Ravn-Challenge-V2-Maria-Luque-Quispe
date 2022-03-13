import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/models/product.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'smallint',
    })
    id: number;

    @Column({
        name: 'name',
        type: 'character varying',
        length: 100,
        nullable: false,
    })
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}