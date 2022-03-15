import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}