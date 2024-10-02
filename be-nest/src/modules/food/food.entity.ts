import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
