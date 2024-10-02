import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';

@Entity('foods')
export class Food {
  @PrimaryGeneratedColumn({ name: 'food_id' })
  id: number;

  @Column({ name: 'food_name' })
  foodName: string;

  @Column({ name: 'food_price' })
  foodPrice: number;

  @Column({ name: 'food_stock' })
  foodStock: number;

  @OneToMany(() => Transaction, (transaction) => transaction.food)
  transactions: Transaction[];
}
