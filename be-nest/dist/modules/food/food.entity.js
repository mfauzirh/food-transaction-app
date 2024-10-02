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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const typeorm_1 = require("typeorm");
let Food = class Food {
};
exports.Food = Food;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'food_id' }),
    __metadata("design:type", Number)
], Food.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'food_name' }),
    __metadata("design:type", String)
], Food.prototype, "foodName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'food_price' }),
    __metadata("design:type", Number)
], Food.prototype, "foodPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'food_stock' }),
    __metadata("design:type", Number)
], Food.prototype, "foodStock", void 0);
exports.Food = Food = __decorate([
    (0, typeorm_1.Entity)('foods')
], Food);
//# sourceMappingURL=food.entity.js.map