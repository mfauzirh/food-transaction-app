"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodController = void 0;
const common_1 = require("@nestjs/common");
const food_service_1 = require("./food.service");
const create_food_dto_1 = require("./dto/create-food.dto");
const update_food_dto_1 = require("./dto/update-food.dto");
let FoodController = class FoodController {
    constructor(foodService) {
        this.foodService = foodService;
    }
    async create(CreateFoodDto) {
        return this.foodService.create(CreateFoodDto);
    }
    async findAll(page = '1', pageSize = '10') {
        return this.foodService.findAll(parseInt(page, 10), parseInt(pageSize, 10));
    }
    async findById(id) {
        return this.foodService.findById(id);
    }
    async update(id, updateFoodDto) {
        return this.foodService.update(id, updateFoodDto);
    }
    async delete(id) {
        await this.foodService.delete(id);
    }
};
exports.FoodController = FoodController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_food_dto_1.CreateFoodDto]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_food_dto_1.UpdateFoodDto]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "delete", null);
exports.FoodController = FoodController = __decorate([
    (0, common_1.Controller)('/api/v1/foods'),
    __metadata("design:paramtypes", [food_service_1.FoodService])
], FoodController);
//# sourceMappingURL=food.controller.js.map