import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint',
    })
    id: number;

    @CreateDateColumn({
        name: 'created_at',
        nullable: false,
        type: 'timestamptz',
        select: false,
    })
    createdAt: Date;
    
    @CreateDateColumn({
        name: 'updated_at',
        nullable: false,
        type: 'timestamptz',
        select: false,
    })
    updatedAt: Date;

    @CreateDateColumn({
        name: 'purchased_at',
        nullable: false,
        type: 'timestamptz',
        select: false,
    })
    purchasedAt: Date;

    @Column({
        type: 'double precision',
        default: 0,
    })
    amount: number;

    //RELATIONS
    // user
    // products


}