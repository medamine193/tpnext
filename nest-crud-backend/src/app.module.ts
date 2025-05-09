import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, CategoryModule, ProductModule],
})
export class AppModule {}