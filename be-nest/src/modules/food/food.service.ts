import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './food.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    const food = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(food);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
    name?: string,
  ): Promise<{ total: number; data: Food[] }> {
    const queryBuilder = this.foodRepository.createQueryBuilder('food');

    if (name) {
      queryBuilder.where('LOWER(food.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    const [data, total] = await queryBuilder
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .getManyAndCount();

    return {
      total,
      data,
    };
  }

  async findById(id: number): Promise<Food> {
    const food = await this.foodRepository.findOne({
      where: { id: id },
    });
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} is not found`);
    }
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const food = await this.findById(id);
    Object.assign(food, updateFoodDto);
    return this.foodRepository.save(food);
  }

  async delete(id: number): Promise<void> {
    const food = await this.findById(id);
    await this.foodRepository.remove(food);
  }
}
