import { Repository } from 'typeorm';
import { Food } from './food.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
export declare class FoodService {
    private foodRepository;
    constructor(foodRepository: Repository<Food>);
    create(createFoodDto: CreateFoodDto): Promise<Food>;
    findAll(page?: number, pageSize?: number): Promise<{
        count: number;
        data: Food[];
    }>;
    findById(id: number): Promise<Food>;
    update(id: number, updateFoodDto: UpdateFoodDto): Promise<Food>;
    delete(id: number): Promise<void>;
}
