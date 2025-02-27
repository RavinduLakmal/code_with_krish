import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from './entity/customer.entity';
import { UpdateCustomerStatus } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {

    
    constructor(private customerService: CustomerService) {

    }

    @Post()
    async create(@Body() customerDto: CustomerDto): Promise<Customer | null> { // its coming from body lets say path use path

        return await this.customerService.create(customerDto);

    }


    
    @Get(':id')
    async fetch(@Param('id') id) { // its coming from body lets say path use path

        return await this.customerService.fetch(id);

    }

    @Get()
    async fetchAll(){
        return await this.customerService.fetchAll();

    }

    @Patch(':id/status')
    async updatePartFromObject(@Param('id') id,@Body() updateCustomerStatus:UpdateCustomerStatus ){ // its coming from body lets say path use path

        return await this.customerService.updateCustomerStatus(id,updateCustomerStatus);

    }
}
