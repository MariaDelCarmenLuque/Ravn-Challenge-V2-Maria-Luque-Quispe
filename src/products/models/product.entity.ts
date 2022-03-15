import { Order } from "src/orders/models/orders.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../../categories/category.entity";
import { ProductStatus } from "./product-status.enum";

@Entity('products')
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
        name: 'image_url',
        type: 'character varying',
        nullable: false,
    })
    imageUrl:string;

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
    
    @Column({
        name: 'status',
        type: 'enum',
        enum: ProductStatus,
        default: ProductStatus.ACTIVE,
      })
      status: ProductStatus;
    

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
      })
    deletedAt?: Date;


    // RELATIONS
    // order
    @OneToMany(() => Order, (order) => order.cartId)
    orders: Order[];
    //-category
    @ManyToOne(()=> Category)
    @JoinColumn({
        name: 'category_id',
    })
    category: Category;

    /**
     * Check if product has availability
     */

    public isAvailable(quantity = 0): boolean {
        return this.stock > quantity;
      }
    
    /**
     * Check if product is active
     */

     public isActive(): boolean {
         if (ProductStatus.ACTIVE)
        return true;
    }

    /**
   * Get final price for given quantity
   */
    getFinalPrice(quantity = 1): number {
        return this.price * quantity;
    }


}