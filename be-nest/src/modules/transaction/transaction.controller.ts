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
  Res,
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
  ): Promise<{ data: Transaction }> {
    return { data: await this.transactionService.create(createTransactionDto) };
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<{ total: number; data: Transaction[] }> {
    return await this.transactionService.findAll(
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<{ data: Transaction }> {
    return { data: await this.transactionService.findById(id) };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<{ data: Transaction }> {
    return {
      data: await this.transactionService.update(id, updateTransactionDto),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res): Promise<void> {
    await this.transactionService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
