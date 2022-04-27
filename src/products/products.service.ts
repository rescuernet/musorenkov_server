import { Injectable } from '@nestjs/common';
import {CreateProductDTO} from "./dto/create-product.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from './schemas/product.schema';
import { Model } from 'mongoose'
import {UpdateProductDTO} from "./dto/update-product.dto";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    }

    async getAll(): Promise<Product[]> {
        return this.productModel.find().exec()
    }

    async getById(id: string): Promise<Product>{
        return this.productModel.findById(id)
    }

    async create(productDTO: CreateProductDTO): Promise<Product>{
        const newProduct = new this.productModel(productDTO)
        return newProduct.save()
    }

    async remove(id: string): Promise<Product>{
        return this.productModel.findByIdAndRemove(id)
    }

    async update(id: string, productDTO: UpdateProductDTO): Promise<Product>{
        return this.productModel.findByIdAndUpdate(id,productDTO,{new:true})
    }

}
