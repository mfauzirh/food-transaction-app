import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';

@Entity('foods')
export class Food {
  @PrimaryGeneratedColumn({ name: 'food_id' })
  id: number;

  @Column({ name: 'food_name' })
  name: string;

  @Column({ name: 'food_price' })
  price: number;

  @Column({ name: 'food_stock' })
  stock: number;

  @OneToMany(() => Transaction, (transaction) => transaction.food)
  transactions: Transaction[];
}
