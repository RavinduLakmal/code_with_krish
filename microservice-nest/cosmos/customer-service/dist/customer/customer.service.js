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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entity/customer.entity");
const update_customer_dto_1 = require("./dto/update-customer.dto");
let CustomerService = class CustomerService {
    customerRepo;
    constructor(customerRepo) {
        this.customerRepo = customerRepo;
    }
    async create(customerDto) {
        const { name, email, address } = customerDto;
        const validateEmail = this.customerRepo.findOne({ where: { email } });
        if (await validateEmail) {
            throw new common_1.ConflictException("Email already exists. Please use a different email.");
        }
        const customer = this.customerRepo.create({ name, email, address, status: 'PENDING' });
        return await this.customerRepo.save(customer);
    }
    async fetch(id) {
        return await this.customerRepo.findOne({
            where: { id }
        });
    }
    async fetchAll() {
        return await this.customerRepo.find();
    }
    async updateCustomerStatus(id, updateStatus) {
        const customer = await this.customerRepo.findOne({ where: { id } });
        if (!customer) {
            throw new common_1.NotFoundException(`order with id: ${id} is not found`);
        }
        if (customer.status === update_customer_dto_1.CustomerStatus.DELIVERED ||
            customer.status === update_customer_dto_1.CustomerStatus.CANCELLED) {
            throw new common_1.BadRequestException(`order status cannot be changed when its deliverd or cancelled `);
        }
        customer.status = updateStatus.status;
        return await this.customerRepo.save(customer);
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map