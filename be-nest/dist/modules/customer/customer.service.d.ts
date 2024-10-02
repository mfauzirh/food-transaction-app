import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    findAll(page?: number, pageSize?: number): Promise<{
        count: number;
        data: Customer[];
    }>;
    create(customerDto: CreateCustomerDto): Promise<Customer>;
    findById(id: number): Promise<Customer>;
    update(id: number, customerDto: UpdateCustomerDto): Promise<Customer>;
    delete(id: number): Promise<void>;
}
