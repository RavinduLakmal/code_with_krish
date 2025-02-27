import { Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';
import { CustomerDto } from './dto/customer.dto';
import { UpdateCustomerStatus } from './dto/update-customer.dto';
export declare class CustomerService {
    private readonly customerRepo;
    constructor(customerRepo: Repository<Customer>);
    create(customerDto: CustomerDto): Promise<Customer | null>;
    fetch(id: any): Promise<Customer | null>;
    fetchAll(): Promise<Customer[]>;
    updateCustomerStatus(id: number, updateStatus: UpdateCustomerStatus): Promise<Customer>;
}
