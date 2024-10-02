import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    findAll(page?: string, pageSize?: string): Promise<{
        count: number;
        data: Customer[];
    }>;
    create(customerDto: CreateCustomerDto, res: any): Promise<Customer>;
    findById(id: number): Promise<Customer>;
    update(id: number, customerDto: UpdateCustomerDto): Promise<Customer>;
    delete(id: number, res: any): Promise<void>;
}
