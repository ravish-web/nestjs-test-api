import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }
    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        });
        const result = await newProduct.save();
        console.log('result', result)
        return result.id
    }
    public async getAllProduct(): Promise<any> {
		const products = await this.productModel.find();
		return products;
	};
    public async getProductById(id: String): Promise<any> {
		const products = await this.productModel.findById(id);
		return products;
	};
}