import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './food.entity';

@Controller('/api/v1/foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async create(@Body() CreateFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodService.create(CreateFoodDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<{ count: number; data: Food[] }> {
    return this.foodService.findAll(parseInt(page, 10), parseInt(pageSize, 10));
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Food> {
    return this.foodService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<Food> {
    return this.foodService.update(id, updateFoodDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.foodService.delete(id);
  }
}
