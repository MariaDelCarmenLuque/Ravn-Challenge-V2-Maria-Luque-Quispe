
import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "src/cart/entity/cart.entity";
import { Product } from "src/products/models/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('CartItem')
export class CartItem {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint',
    })
    @ApiProperty({
        example: 1,
        description: 'Cart Item ID',
        readOnly: true,
        type: Number,
      })
    id:number;
    
    @Column({
        name: 'quantity',
        type: 'int',
        nullable: false,
    })
    @ApiProperty({
        type: Number,
        example: 10,
        description: 'Products quantity to add to Cart',
        nullable: false,
        minimum: 1,
      })
    quantity: number;

    @Column({
        name: 'subtotal',
        type: 'bigint',
        nullable: true,
    })
    @ApiProperty({
        example: 1000,
        description: 'Cart Item subtotal',
        nullable: false,
        type: Number,
      })
    subtotal: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        nullable: false,
    })
    @ApiProperty({
        example: '2016-03-26 10:10:10-05:00',
        description: "Cart Item's creation date",
        format: 'date-time',
        type: Date,
        nullable: false,
      })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        nullable: false,
    })
    @ApiProperty({
        example: '2016-03-26 10:10:10-05:00',
        description: "Cart Item's last update date",
        format: 'date-time',
        type: Date,
        nullable: false,
    })
    updatedAt: Date;
   
    @ManyToOne(() => Product, (product) => product.items)
    @JoinColumn({
        name: 'product_id',
    })
    @ApiProperty({
        type: () => Product,
        description: 'Product that the Product Item represents',
      })

    productId: number;
    
    @ManyToOne(() => Cart, (cart) => cart.items)
    @JoinColumn({
        name: 'cart_id',
    })
    @ApiProperty({
        description: 'Cart which Cart Product belongs',
      })

    cartId: number;

}