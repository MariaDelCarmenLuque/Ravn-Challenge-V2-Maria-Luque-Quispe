import { Order } from "src/orders/models/orders.entity";
import { User } from "src/users/models/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    /**
    * Products to be purchased
     */
    @OneToMany(() => Order, (order) => order.cartId)
    orders: Order[];
    



}