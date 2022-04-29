import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {ProductsService} from "./products.service";
import {Product} from "./product.schema";

@Controller('/api/products')
export class ProductsController {
    constructor(private readonly prodService: ProductsService) {
    }

    @Get()
    getAll(): Promise<Product[]> {
        return this.prodService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Product> {
        return this.prodService.getById(id)
    }

    @Post()
    create(@Body() createProductDTO: CreateProductDto): Promise<Product>{
        return this.prodService.create(createProductDTO)
    }

    @Delete(':id')
    remove(@Param('id') id:string): Promise<Product>{
        return this.prodService.remove(id)
    }

    @Put(':id')
    update(@Body() dto:UpdateProductDto,@Param('id') id:string): Promise<Product>{
        return this.prodService.update(id,dto)
    }


}
