import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProdutsService } from './produts.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { UpdateProductStatus } from './dto/update-product.dto';

@Controller('produts')
export class ProdutsController {

    constructor(private productService: ProdutsService) {

    }

    /**
     * *
     * @param customerDto
     */
    @Post()
    async create(@Body() customerDto: ProductDto): Promise<Product | null> { 

        return await this.productService.create(customerDto);

    }


    /**
     * *
     * @param id
     */
    @Get(':id')
    async fetch(@Param('id') id) { 

        return await this.productService.fetch(id);

    }

    /**
     * fetch all products*
     */

    @Get()
    async fetchAll(){
        return await this.productService.fetchAll();

    }

    /**
     * fetch and validate stock*
     * @param id
     * @param quantity
     */

    @Get(':id/validate')
    async validateStock(@Param('id') id,@Query('quantity', ParseIntPipe) quantity: number) {
        return await this.productService.validateStock(id,quantity);

    }

    /**
     * update status*
     * @param id
     * @param updateProductStatus
     */

    @Patch(':id/status')
    async updatePartFromObject(@Param('id') id,@Body() updateProductStatus:UpdateProductStatus ){

        return await this.productService.updateProductStatus(id,updateProductStatus);

    }

}
