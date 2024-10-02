import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'phone' })
  phone: string;
}
