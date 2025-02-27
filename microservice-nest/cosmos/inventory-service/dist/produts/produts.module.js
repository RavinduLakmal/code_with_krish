"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutsModule = void 0;
const common_1 = require("@nestjs/common");
const produts_service_1 = require("./produts.service");
const produts_controller_1 = require("./produts.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entity/product.entity");
let ProdutsModule = class ProdutsModule {
};
exports.ProdutsModule = ProdutsModule;
exports.ProdutsModule = ProdutsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product])],
        providers: [produts_service_1.ProdutsService],
        controllers: [produts_controller_1.ProdutsController]
    })
], ProdutsModule);
//# sourceMappingURL=produts.module.js.map