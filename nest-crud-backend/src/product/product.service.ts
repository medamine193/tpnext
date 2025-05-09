import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ 
      where: { id },
      relations: ['category'] 
    });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async create(product: Product): Promise<Product> {
    if (product.category && product.category.id) {
      const category = await this.categoryRepository.findOne({ 
        where: { id: product.category.id } 
      });
      
      if (!category) {
        throw new NotFoundException(`Category with ID ${product.category.id} not found`);
      }
      
      product.category = category;
    } else {
      product.category = null;
    }
    
    return this.productRepository.save(product);
  }

  async update(id: number, product: Product): Promise<Product> {
    const existingProduct = await this.findOne(id);
    
    if (product.category && product.category.id) {
      const category = await this.categoryRepository.findOne({ 
        where: { id: product.category.id } 
      });
      
      if (!category) {
        throw new NotFoundException(`Category with ID ${product.category.id} not found`);
      }
      
      product.category = category;
    } else {
      product.category = null;
    }
    
    await this.productRepository.update(id, product);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}