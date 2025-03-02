import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { createOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './entity/order.entity';
import path from 'path';
import { UpdateOrderStatus } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {

    constructor(private orderService: OrdersService) {

    }

    /**
     * *
     * @param createOrderDto
     */

    @Post()
    async create(@Body() createOrderDto: createOrderDto): Promise<Order | null> { 
        return await this.orderService.create(createOrderDto);

    }

    /**
     * *
     * @param id
     */

    @Get(':id')
    async fetch(@Param('id') id) { 
        return await this.orderService.fetch(id);

    }

    /**
     * *
     */
    @Get()
    async fetchAll(){

        return await this.orderService.fetchAll();

    }

    /**
     * *
     * @param id
     * @param updateOrderStatus
     */

    @Patch(':id/status')
    async updatePartFromObject(@Param('id') id,@Body() updateOrderStatus:UpdateOrderStatus ){ 
        return await this.orderService.updateOrderStatus(id,updateOrderStatus);

    }

}
