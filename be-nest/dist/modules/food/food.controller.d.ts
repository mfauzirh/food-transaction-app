import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './food.entity';
export declare class FoodController {
    private readonly foodService;
    constructor(foodService: FoodService);
    create(CreateFoodDto: CreateFoodDto): Promise<Food>;
    findAll(page?: string, pageSize?: string): Promise<{
        count: number;
        data: Food[];
    }>;
    findById(id: number): Promise<Food>;
    update(id: number, updateFoodDto: UpdateFoodDto): Promise<Food>;
    delete(id: number): Promise<void>;
}
