import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateFoodDto {
  @IsString()
  @IsNotEmpty()
  foodName: string;

  @IsNumber()
  @IsPositive()
  foodPrice: number;

  @IsNumber()
  @IsPositive()
  foodStock: number;
}
