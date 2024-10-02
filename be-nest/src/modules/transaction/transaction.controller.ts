import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.create(createTransactionDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<{ count: number; data: Transaction[] }> {
    return await this.transactionService.findAll(
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Transaction> {
    return this.transactionService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.transactionService.delete(id);
  }
}
