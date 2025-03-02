import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductStatus, UpdateProductStatus } from './dto/update-product.dto';

@Injectable()
export class ProdutService {

    constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>) {

    }

    async create(productDto: ProductDto): Promise<Product | null> {

        const { name, price, quantity } = productDto;
        const product = this.productRepo.create({ name, price, quantity, status: 'PENDING' });
        return await this.productRepo.save(product);

    }


    async fetch(id: any) {

        return await this.productRepo.findOne({
            where: { id }
        });

    }

    async fetchAll() {
        return await this.productRepo.find()
    }

    async updateProductStatus(id: number, updateStatus: UpdateProductStatus) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with id: ${id} is not found`);
        }

        if (product.status === ProductStatus.DELIVERED ||
            product.status === ProductStatus.CANCELLED
        ) {

            throw new BadRequestException(`Product status cannot be changed when its deliverd or cancelled `);
        }

        product.status = updateStatus.status;

        return await this.productRepo.save(product);

    }


    async validateStock(id, qty) {

        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with id: ${id} is not found`);
        }

        if (product.quantity >= qty) {
            return {
                ...product, "available": true,

            }
        } else {

            return {
                ...product, "available": false,

            }

        }

    }


    async reduceTheStock(id, qty) {

        const product = await this.productRepo.findOne({ where: { id } });
        const value = (product?.quantity ?? 0) - qty;
        await this.productRepo.save({...product,quantity:value});
        return true;
    }

    async availbleStockByIdWithQty(id,qty){
        
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with id: ${id} is not found`);
        }

        if (product.quantity >= qty) {
            return {
                ...product, 

            }
        } else {

            return {
                ...product, 

            }

        }
    }
}
