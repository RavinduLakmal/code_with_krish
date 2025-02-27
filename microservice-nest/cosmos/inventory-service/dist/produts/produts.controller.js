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
exports.ProdutsController = void 0;
const common_1 = require("@nestjs/common");
const produts_service_1 = require("./produts.service");
const product_dto_1 = require("./dto/product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
let ProdutsController = class ProdutsController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async create(customerDto) {
        return await this.productService.create(customerDto);
    }
    async fetch(id) {
        return await this.productService.fetch(id);
    }
    async fetchAll() {
        return await this.productService.fetchAll();
    }
    async validateStock(id, quantity) {
        return await this.productService.validateStock(id, quantity);
    }
    async updatePartFromObject(id, updateProductStatus) {
        return await this.productService.updateProductStatus(id, updateProductStatus);
    }
};
exports.ProdutsController = ProdutsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProdutsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProdutsController.prototype, "fetch", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProdutsController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)(':id/validate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('quantity', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProdutsController.prototype, "validateStock", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_product_dto_1.UpdateProductStatus]),
    __metadata("design:returntype", Promise)
], ProdutsController.prototype, "updatePartFromObject", null);
exports.ProdutsController = ProdutsController = __decorate([
    (0, common_1.Controller)('produts'),
    __metadata("design:paramtypes", [produts_service_1.ProdutsService])
], ProdutsController);
//# sourceMappingURL=produts.controller.js.map