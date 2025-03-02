import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProdutService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { UpdateProductStatus } from './dto/update-product.dto';

@Controller('produts')
export class ProdutController {

    constructor(private productService: ProdutService) {

    }

    @Post()
    async create(@Body() productDto: ProductDto): Promise<Product | null> { 

        return await this.productService.create(productDto);

    }

    @Get(':id')
    async fetch(@Param('id') id) { 

        return await this.productService.fetch(id);

    }

    @Get()
    async fetchAll(){
        return await this.productService.fetchAll();

    }

    @Get(':id/validate')
    async validateStock(@Param('id') id,@Query('quantity', ParseIntPipe) quantity: number) {
        console.log("called product Orders")
        return await this.productService.validateStock(id,quantity);

    }

    @Patch(':id/status')
    async updatePartFromObject(@Param('id') id,@Body() updateProductStatus:UpdateProductStatus ){
        
        return await this.productService.updateProductStatus(id,updateProductStatus);

    }

    @Get(':id/reduce/stock')
    async reduceTheStockByIdAndQTY(@Param('id') id,@Query('quantity', ParseIntPipe) quantity: number ){
        
        return await this.productService.reduceTheStock(id,quantity);

    }


    @Get(':id/avaible/stock')
    async availbleStockById(@Param('id') id ,@Query('quantity', ParseIntPipe) quantity: number){
        
        return await this.productService.availbleStockByIdWithQty(id,quantity);

    }

}
