import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Food } from '../food/food.entity';
import { Customer } from '../customer/customer.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const foodItem = await entityManager.findOne(Food, {
          where: { id: createTransactionDto.foodId },
        });
        if (!foodItem) {
          throw new NotFoundException('Food not found');
        }

        const customer = await entityManager.findOne(Customer, {
          where: { id: createTransactionDto.customerId },
        });
        if (!customer) {
          throw new NotFoundException('Customer not found');
        }

        if (foodItem.foodStock < createTransactionDto.qty) {
          throw new BadRequestException('Insufficient stock');
        }

        const transaction = entityManager.create(Transaction, {
          customer,
          food: foodItem,
          qty: createTransactionDto.qty,
          totalPrice: foodItem.foodPrice * createTransactionDto.qty,
          transactionDate: new Date(),
        });

        foodItem.foodStock -= createTransactionDto.qty;
        await entityManager.save(Food, foodItem);

        return await entityManager.save(Transaction, transaction);
      },
    );
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ count: number; data: Transaction[] }> {
    const [data, total] = await this.transactionRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: ['food', 'customer'],
    });
    return {
      count: total,
      data,
    };
  }

  async findById(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['food', 'customer'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const transaction = await entityManager.findOne(Transaction, {
          where: { id },
          relations: ['food'],
        });
        if (!transaction) {
          throw new NotFoundException('Transaction not found');
        }

        const foodItem = await entityManager.findOne(Food, {
          where: { id: transaction.foodId },
        });
        if (!foodItem) {
          throw new NotFoundException('Food not found');
        }

        if (foodItem.foodStock < updateTransactionDto.qty) {
          throw new BadRequestException('Insufficient stock');
        }

        const previousQty = transaction.qty;
        foodItem.foodStock += previousQty - updateTransactionDto.qty;

        transaction.qty = updateTransactionDto.qty;
        transaction.totalPrice = foodItem.foodPrice * updateTransactionDto.qty;

        await entityManager.save(Food, foodItem);
        return await entityManager.save(Transaction, transaction);
      },
    );
  }

  async delete(id: number): Promise<void> {
    return await this.transactionRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const transaction = await entityManager.findOne(Transaction, {
          where: { id },
          relations: ['food'],
        });

        if (!transaction) {
          throw new NotFoundException('Transaction not found');
        }

        const foodItem = await entityManager.findOne(Food, {
          where: { id: transaction.foodId },
        });

        if (!foodItem) {
          throw new NotFoundException('Food not found');
        }

        foodItem.foodStock += transaction.qty;

        await entityManager.save(Food, foodItem);

        await entityManager.remove(Transaction, transaction);
      },
    );
  }
}
