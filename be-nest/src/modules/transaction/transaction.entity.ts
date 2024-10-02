import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Food } from '../food/food.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'food_id' })
  foodId: number;

  @Column({ name: 'qty' })
  qty: number;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column({ name: 'transaction_date', type: 'timestamp' })
  transactionDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.transactions)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Food, (food) => food.transactions)
  @JoinColumn({ name: 'food_id' })
  food: Food;
}
