import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { CartItem} from "src/cartItems/models/cartItems.entity";
import { User } from "src/users/models/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn({
        unsigned: true,
        type: 'bigint',
    })
    @ApiProperty({
        name: 'id',
        type: 'integer',
        readOnly: true,
        example: 1,
    })
    id: number;

    @CreateDateColumn({
        name: 'created_at',
        nullable: false,
        type: 'timestamptz',
        select: false,
    })
    @ApiHideProperty()
    createdAt: Date;
    
    @CreateDateColumn({
        name: 'updated_at',
        nullable: false,
        type: 'timestamptz',
        select: false,
    })
    @ApiHideProperty()
    updatedAt: Date;

    @CreateDateColumn({
        name: 'purchased_at',
        nullable: false,
        type: 'timestamptz',
        select: false,
    })
    @ApiProperty({
        name: 'purchasedAt',
        type: 'string',
        format: 'date-time',
        readOnly: true,
        default: null,
        example: '2021-12-13T03:00:00.000Z',
    })
    purchasedAt: Date;

    @Column({
        type: 'double precision',
        default: 0,
    })
    @ApiProperty({
        name: 'amount',
        type: 'integer',
        required: true,
        example: '666',
        description: 'Product amount in this cart',
      })
    amount: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

   
    
  /**
   * Products to be purchased
   */
    @OneToMany(() => CartItem, (cartItem) => cartItem.cartId)
    @JoinColumn({ name: 'items' })
    items: CartItem[];
    



}