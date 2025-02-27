import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from './entity/customer.entity';
import { UpdateCustomerStatus } from './dto/update-customer.dto';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    create(customerDto: CustomerDto): Promise<Customer | null>;
    fetch(id: any): Promise<Customer | null>;
    fetchAll(): Promise<Customer[]>;
    updatePartFromObject(id: any, updateCustomerStatus: UpdateCustomerStatus): Promise<Customer>;
}
