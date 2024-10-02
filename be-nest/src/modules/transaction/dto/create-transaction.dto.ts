import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  foodId: number;

  @IsNumber()
  @IsNotEmpty()
  qty: number;
}
