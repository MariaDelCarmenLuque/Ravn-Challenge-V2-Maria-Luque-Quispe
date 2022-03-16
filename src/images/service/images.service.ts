import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Product } from 'src/products/models/product.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from '../models/create-image.dto';
import { Images } from '../models/images.entity';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Images)
        private readonly imagesRepository: Repository<Images>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    async getAll(
        options: IPaginationOptions,
        ): Promise<Pagination<Images>> {
        return paginate<Images>(this.imagesRepository, options, {
            relations:['product']
        });
    }

    async create(body:CreateImageDto):Promise<Images>{
        const newImage = this.imagesRepository.create(body)
        const product: Product = await this.productsRepository.findOne(
            body.productId,
          );
      
          if (!product) {
            throw new UnprocessableEntityException('Product does not exist');
          }
      
          product.images = [newImage];
        return this.imagesRepository.save(newImage);
    }


}
