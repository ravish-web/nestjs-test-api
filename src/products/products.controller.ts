import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { get } from 'http';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService
    ){}
    @Post()
    async getPosts(
        @Body('title') productTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
        )
        {
        const generatedId = await  this.productService.insertProduct(productTitle, prodDesc, prodPrice);
        return { id:generatedId }
    }
    @Get('list')
    async getAllProducts(){
        const products = await this.productService.getAllProduct();
        console.log('products',products)
        return products
    }
    @Get(':id')
    async getProductById(@Param('id') id: string){
        const products = await this.productService.getProductById(id);
        console.log('products',products)
        return products
    }
}
