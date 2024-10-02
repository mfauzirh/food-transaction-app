import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ count: number; data: Customer[] }> {
    const [data, total] = await this.customerRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      count: total,
      data,
    };
  }

  async create(customerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(customerDto);
    return this.customerRepository.save(customer);
  }

  async findById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id: id },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async update(id: number, customerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findById(id);
    await this.customerRepository.update(customer.id, customerDto);
    return this.customerRepository.findOne({
      where: { id: id },
    });
  }

  async delete(id: number): Promise<void> {
    const customer = await this.findById(id);
    await this.customerRepository.delete(customer.id);
  }
}
