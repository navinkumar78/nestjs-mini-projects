import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return await new this.model(dto).save();
  }

  async findAll(): Promise<Product[]> {
    return this.model.find().exec();
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
