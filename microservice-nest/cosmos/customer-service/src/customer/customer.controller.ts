import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from './entity/customer.entity';
import { UpdateCustomerStatus } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {

    
    constructor(private customerService: CustomerService) {

    }

    /**
     * create custome api*
     * @param customerDto
     */
    @Post()
    async create(@Body() customerDto: CustomerDto): Promise<Customer | null> {

        return await this.customerService.create(customerDto);

    }

    /**
     * fetch customer id*
     * @param id
     */
    
    @Get(':id')
    async fetch(@Param('id') id) { // its coming from body lets say path use path
        console.log("wada");
        return await this.customerService.fetch(id);

    }

    /**
     * fetch all customer
     * * *
     */

    @Get()
    async fetchAll(){
        return await this.customerService.fetchAll();

    }

    /**
     * customer update only status*
     * @param id
     * @param updateCustomerStatus
     */

    @Patch(':id/status')
    async updatePartFromObject(@Param('id') id,@Body() updateCustomerStatus:UpdateCustomerStatus ){ // its coming from body lets say path use path

        return await this.customerService.updateCustomerStatus(id,updateCustomerStatus);

    }


}
