// src/transaction/dto/update-transaction.dto.ts
import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  qty: number;
}
