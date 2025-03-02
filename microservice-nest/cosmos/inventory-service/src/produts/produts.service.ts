import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductStatus, UpdateProductStatus } from './dto/update-product.dto';

@Injectable()
export class ProdutsService {

    constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>){
        
    }

    /**
     *
     * * *
     * @param productDto
     */
    async create(productDto:ProductDto) : Promise<Product|null>{

        const { name, price,quantity } = productDto;
        const product=this.productRepo.create({name,price,quantity,status: 'PENDING' });
          return await this.productRepo.save(product);

    }

    /**
     * *
     * @param id
     */
    
    async fetch(id: any) {

        return await this.productRepo.findOne({
            where: { id }
        });

    }

    /**
     * *
     */
    async fetchAll() {
        return await this.productRepo.find()
    }

    /**
     * *
     * @param id
     * @param updateStatus
     */

    async updateProductStatus(id: number, updateStatus: UpdateProductStatus) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`order with id: ${id} is not found`);
        }

        if (product.status === ProductStatus.DELIVERED ||
            product.status === ProductStatus.CANCELLED
        ) {

            throw new BadRequestException(`order status cannot be changed when its deliverd or cancelled `);
        }

        product.status=updateStatus.status;

        return await this.productRepo.save(product);

    }


    /**
     * Validate status by stock*
     * @param id
     * @param qty
     */

    async  validateStock(id,qty) {

            const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`order with id: ${id} is not found`);
        }

        if(product.quantity>=qty){
            return {"available":true}
        }else{
            return {"available": false}
        }

    }
}
