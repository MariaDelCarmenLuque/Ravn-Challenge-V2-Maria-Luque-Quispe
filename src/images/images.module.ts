import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/models/product.entity';
import { ImagesController } from './controller/images.controller';
import { Images } from './models/images.entity';
import { ImagesService } from './service/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Images, Product])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
