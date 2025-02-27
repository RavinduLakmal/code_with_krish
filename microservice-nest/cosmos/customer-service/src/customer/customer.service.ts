import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';
import { CustomerDto } from './dto/customer.dto';
import { CustomerStatus, UpdateCustomerStatus } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {

    constructor(@InjectRepository(Customer) private readonly customerRepo: Repository<Customer>){
        
    }

    async create(customerDto:CustomerDto) : Promise<Customer|null>{
        
        const { name, email,address } = customerDto;

        const validateEmail=this.customerRepo.findOne({where:{email}});

        if(await validateEmail){
            throw new ConflictException("Email already exists. Please use a different email.");
        }
        
        const customer=this.customerRepo.create({name,email,address,status: 'PENDING' });
          return await this.customerRepo.save(customer);

    }

    
    async fetch(id: any) {

        return await this.customerRepo.findOne({
            where: { id }
        });

    }

    async fetchAll() {
        return await this.customerRepo.find()
    }

    async updateCustomerStatus(id: number, updateStatus: UpdateCustomerStatus) {
        const customer = await this.customerRepo.findOne({ where: { id } });
        if (!customer) {
            throw new NotFoundException(`order with id: ${id} is not found`);
        }

        if (customer.status === CustomerStatus.DELIVERED ||
            customer.status === CustomerStatus.CANCELLED
        ) {

            throw new BadRequestException(`order status cannot be changed when its deliverd or cancelled `);
        }

        customer.status=updateStatus.status;

        return await this.customerRepo.save(customer);

    }

}
