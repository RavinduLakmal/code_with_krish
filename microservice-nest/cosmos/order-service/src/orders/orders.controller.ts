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

    @Post()
    async create(@Body() createOrderDto: createOrderDto): Promise<Order | null> { // its coming from body lets say path use path

        return await this.orderService.create(createOrderDto);

    }


    @Get(':id')
    async fetch(@Param('id') id) { // its coming from body lets say path use path

        return await this.orderService.fetch(id);

    }

    @Get()
    async fetchAll(){
        return await this.orderService.fetchAll();

    }

    @Patch(':id/status')
    async updatePartFromObject(@Param('id') id,@Body() updateOrderStatus:UpdateOrderStatus ){ // its coming from body lets say path use path

        return await this.orderService.updateOrderStatus(id,updateOrderStatus);

    }

}
