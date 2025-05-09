import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { Category } from '../category/category.entity'; // Add this import

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]), // Add Category here
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}