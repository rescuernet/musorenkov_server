import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateProductDTO} from "./dto/create-product.dto";
import {UpdateProductDTO} from "./dto/update-product.dto";
import {ProductsService} from "./products.service";
import {Product} from "./schemas/product.schema";

@Controller('products')
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
    create(@Body() createProductDTO: CreateProductDTO): Promise<Product>{
        return this.prodService.create(createProductDTO)
    }

    @Delete(':id')
    remove(@Param('id') id:string): Promise<Product>{
        return this.prodService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDTO:UpdateProductDTO,@Param('id') id:string): Promise<Product>{
        return this.prodService.update(id,updateProductDTO)
    }


}
