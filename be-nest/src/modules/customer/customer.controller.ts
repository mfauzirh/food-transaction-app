import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('api/v1/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('name') name?: string,
  ): Promise<{ total: number; data: Customer[] }> {
    return this.customerService.findAll(
      parseInt(page, 10),
      parseInt(pageSize, 10),
      name,
    );
  }

  @Post()
  async create(
    @Body() customerDto: CreateCustomerDto,
    @Res() res,
  ): Promise<{ data: Customer[] }> {
    const customer = await this.customerService.create(customerDto);
    return res.status(HttpStatus.CREATED).json({ data: customer });
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<{ data: Customer }> {
    return { data: await this.customerService.findById(id) };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() customerDto: UpdateCustomerDto,
  ): Promise<{ data: Customer }> {
    return { data: await this.customerService.update(id, customerDto) };
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res): Promise<void> {
    await this.customerService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
