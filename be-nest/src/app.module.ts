// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './modules/customer/customer.controller';
import { CustomerService } from './modules/customer/customer.service';
import { Customer } from './modules/customer/customer.entity'; // Adjust the path to your Customer entity
import { FoodService } from './modules/food/food.service';
import { Food } from './modules/food/food.entity';
import { FoodController } from './modules/food/food.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'food_transaction_app',
      entities: [Customer, Food],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer, Food]),
  ],
  controllers: [CustomerController, FoodController],
  providers: [CustomerService, FoodService],
})
export class AppModule {}
