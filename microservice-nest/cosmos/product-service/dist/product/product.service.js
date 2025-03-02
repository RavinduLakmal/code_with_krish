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
exports.ProdutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entity/product.entity");
const typeorm_2 = require("typeorm");
const update_product_dto_1 = require("./dto/update-product.dto");
let ProdutService = class ProdutService {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async create(productDto) {
        const { name, price, quantity } = productDto;
        const product = this.productRepo.create({ name, price, quantity, status: 'PENDING' });
        return await this.productRepo.save(product);
    }
    async fetch(id) {
        return await this.productRepo.findOne({
            where: { id }
        });
    }
    async fetchAll() {
        return await this.productRepo.find();
    }
    async updateProductStatus(id, updateStatus) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id: ${id} is not found`);
        }
        if (product.status === update_product_dto_1.ProductStatus.DELIVERED ||
            product.status === update_product_dto_1.ProductStatus.CANCELLED) {
            throw new common_1.BadRequestException(`Product status cannot be changed when its deliverd or cancelled `);
        }
        product.status = updateStatus.status;
        return await this.productRepo.save(product);
    }
    async validateStock(id, qty) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id: ${id} is not found`);
        }
        if (product.quantity >= qty) {
            return {
                ...product, "available": true,
            };
        }
        else {
            return {
                ...product, "available": false,
            };
        }
    }
    async reduceTheStock(id, qty) {
        const product = await this.productRepo.findOne({ where: { id } });
        const value = (product?.quantity ?? 0) - qty;
        await this.productRepo.save({ ...product, quantity: value });
        return true;
    }
    async availbleStockByIdWithQty(id, qty) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id: ${id} is not found`);
        }
        if (product.quantity >= qty) {
            return {
                ...product,
            };
        }
        else {
            return {
                ...product,
            };
        }
    }
};
exports.ProdutService = ProdutService;
exports.ProdutService = ProdutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProdutService);
//# sourceMappingURL=product.service.js.map