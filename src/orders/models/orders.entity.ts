
import { Cart } from "src/cart/entity/cart.entity";
import { Product } from "src/products/models/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint',
    })
    id:number;
    
    @Column({
        name: 'quantity',
        type: 'int',
        nullable: false,
    })
    quantity: number;

    @Column({
        name: 'subtotal',
        type: 'bigint',
        nullable: false,
    })
    subtotal: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        nullable: false,
    })
    updatedAt: Date;
   
    @ManyToOne(() => Product, (product) => product.orders)
    @JoinColumn({
        name: 'product_id',
    })
    productId: number;
    
    @ManyToOne(() => Cart, (cart) => cart.orders)
    @JoinColumn({
        name: 'cart_id',
    })
    cartId: number;

}