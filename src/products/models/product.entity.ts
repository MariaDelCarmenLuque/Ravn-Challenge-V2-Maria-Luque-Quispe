import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({
        readOnly: true,
        type: Number,
        example: 1,
        description: 'Product ID',
      })
    id: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
    })
    @ApiProperty({
        example: '2016-03-26 10:10:10-05:00',
        description: "Product's creation date",
        default: 'CURRENT_TIMESTAMP',
        type: Date,
        format: 'date-time',
      })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
    })
    @ApiProperty({
        example: '2016-03-26 10:10:10-05:00',
        description: "Product's last update date",
        default: 'CURRENT_TIMESTAMP',
        type: Date,
        format: 'date-time',
      })
    updatedAt: Date;

    @Column({
        name: 'name',
        type: 'character varying',
        length: 100,
        nullable: false,
    })
    @ApiProperty({
        example: 'Chocolate Cake',
        description: 'Product name',
        nullable: false,
        maxLength: 100,
      })
    name: string;

    @Column({
        name: 'description',
        type: 'character varying',
        length: 1000,
        nullable: false,
    })
    @ApiProperty({
        example: 'Chocolate cake contains a variety of dried fruits',
        description: 'Product description',
        nullable: false,
        maxLength: 1000,
      })
    description: string;

    @Column({
        name: 'image_url',
        type: 'character varying',
        nullable: false,
    })
    @ApiProperty({
      example: '["https://site/subsite/documentlibrary/Desserts.jpg","https://site/subsite/documentlibrary/Desserts.jpg","https://site/subsite/documentlibrary/Desserts.jpg"]',
      description: 'URLs image of Product',
      nullable: false,
    })
    imageUrl:string;

    @Column({
        name: 'price',
        type: 'float',
        nullable: false,
    })
    @ApiProperty({
        nullable: false,
        example: 1050.50,
        description: 'Product Price',
        type: Number,
      })
    price: number;

    @Column({
        name: 'stock',
        type: 'int',
        nullable: false,
    })
    @ApiProperty({
        nullable: false,
        example: 10,
        description: 'Product Stock',
        type: Number,
      })
    stock: number;
    
    @Column({
        name: 'status',
        type: 'enum',
        enum: ProductStatus,
        default: ProductStatus.ACTIVE,
      })
    @ApiProperty({
        nullable: false,
        default: "ACTIVE",
        example: "ACTIVE",
        description: 'Product Status',
        type: 'enum',
    })
    status: ProductStatus;


    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
      })
    @ApiProperty({
        example: '2016-03-26 10:10:10-05:00',
        description: "Product's delete date",
        default: 'CURRENT_TIMESTAMP',
        type: Date,
        format: 'date-time',
    })
    deletedAt?: Date;


    /**
    * Relation with Order entity
    */
    @OneToMany(() => Order, (order) => order.cartId)
    @ApiProperty({ type: Order, description: 'Product contains multiple instance of Orders' })
    orders: Order[];
   /**
    * Relation with category entity
    */
    @ManyToOne(()=> Category)
    @JoinColumn({
        name: 'category_id',
    })
    @ApiProperty({ type: Category, description: 'Product contains only one instance of Category' })
    category: Category;

    /**
     * Check if product has availability
     * @description Product can't be available when the stock is less than the quantity requestes in the order
     * @param quantity
     */

    public isAvailable(quantity:number): boolean {
        return this.stock > quantity;
      }
    
    /**
     * Check if product is active
     * @description Product can be inactive when has been disable by the Manager
     */

     public isActive(): boolean {
         if (ProductStatus.ACTIVE)
        return true;
    }

    /**
   * Get final price for given quantity
   * @param quantity
   */
    getFinalPrice(quantity:number): number {
        return this.price * quantity;
    }


}