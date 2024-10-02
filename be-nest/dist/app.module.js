"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_controller_1 = require("./modules/customer/customer.controller");
const customer_service_1 = require("./modules/customer/customer.service");
const customer_entity_1 = require("./modules/customer/customer.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'mysecretpassword',
                database: 'food_transaction_app',
                entities: [customer_entity_1.Customer],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer]),
        ],
        controllers: [customer_controller_1.CustomerController],
        providers: [customer_service_1.CustomerService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map