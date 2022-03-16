import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { Product } from './products/models/product.entity';
import { User } from './users/models/user.entity';
import { Cart } from './cart/entity/cart.entity';
import { Category } from './categories/category.entity';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { CartItem } from './cartItems/models/cartItems.entity';
import { CartItemsModule } from './cartItems/cartItems.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Product,User,Cart,Category,CartItem],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    CartModule,
    CategoriesModule,
    CartItemsModule,
    ProductsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
