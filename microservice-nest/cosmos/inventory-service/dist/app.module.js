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
const produts_module_1 = require("./produts/produts.module");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./produts/entity/product.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [produts_module_1.ProdutsModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.HOSTNAME || 'localhost',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'cosmos',
                entities: [product_entity_1.Product],
                synchronize: true
            })],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map