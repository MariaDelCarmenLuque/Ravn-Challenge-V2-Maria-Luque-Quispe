import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/models/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('images')
export class Images {
    @ApiProperty({
        name: 'id',
        type: Number,
        description: "Image's ID",
        readOnly: true
    })
    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true,
    })
    id: number;

    @ApiProperty({
        example: '2021-11-27T17:03:41.356Z',
        type: Date,
        format: 'date-time',
        description: 'Creation date',
        default: 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    @CreateDateColumn({
        type: 'timestamp with time zone',
        name: 'created_at',
        nullable: false,
    })
    createdAt: Date;
    
    @ApiProperty({
        example: 'https://localhost:3000/galery/items/yellow_one.jpg',
        type: String,
        description: 'Route to the photo',
        nullable: false,
        maxLength: 200,
    })
    @Column({
        name: 'url',
        type: 'character varying',
        length: 200,
        nullable: false,
    })
    url: string;

    @ManyToOne(() => Product, product => product.images)
    @JoinColumn({
        name: 'product_id',
    })
    @ApiProperty({ type: Images, description: 'Images contains only one instance of Product' }) 
    product: Product;




}