import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProdutService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { UpdateProductStatus } from './dto/update-product.dto';

@Controller('products')
export class ProductController {

    constructor(private productService: ProdutService) {

    }

    /**
     * *
     * @param productDto
     */
    @Post()
    async create(@Body() productDto: ProductDto): Promise<Product | null> { 

        return await this.productService.create(productDto);

    }

    /**
     * *
     * @param id
     */

    @Get(':id')
    async fetch(@Param('id') id) { 

        return await this.productService.fetch(id);

    }

    @Get()
    async fetchAll(){
        return await this.productService.fetchAll();

    }

    /**
     * *
     * @param id
     * @param quantity
     */

    @Get(':id/validate')
    async validateStock(@Param('id') id,@Query('quantity', ParseIntPipe) quantity: number) {
        console.log("called product Orders")
        return await this.productService.validateStock(id,quantity);

    }


    /**
     * *
     * @param id
     * @param updateProductStatus
     */

    @Patch(':id/status')
    async updatePartFromObject(@Param('id') id,@Body() updateProductStatus:UpdateProductStatus ){
        
        return await this.productService.updateProductStatus(id,updateProductStatus);

    }

    /**
     * *
     * @param id
     * @param quantity
     */

    @Get(':id/reduce/stock')
    async reduceTheStockByIdAndQTY(@Param('id') id,@Query('quantity', ParseIntPipe) quantity: number ){
        
        return await this.productService.reduceTheStock(id,quantity);

    }

    /**
     * *
     * @param id
     * @param quantity
     */

    @Get(':id/available/stock')
    async availableStockById(@Param('id') id ,@Query('quantity', ParseIntPipe) quantity: number){
        
        return await this.productService.availableStockByIdWithQty(id,quantity);

    }

}
