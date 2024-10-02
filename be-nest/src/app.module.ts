// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './modules/customer/customer.controller';
import { CustomerService } from './modules/customer/customer.service';
import { Customer } from './modules/customer/customer.entity'; // Adjust the path to your Customer entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Change to your database type (e.g., mysql, sqlite)
      host: 'localhost',
      port: 5432, // Default PostgreSQL port
      username: 'postgres', // Replace with your database username
      password: 'mysecretpassword', // Replace with your database password
      database: 'food_transaction_app', // Replace with your database name
      entities: [Customer], // Register the Customer entity
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([Customer]), // Register Customer repository
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class AppModule {}
