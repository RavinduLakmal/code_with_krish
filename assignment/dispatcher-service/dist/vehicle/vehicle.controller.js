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
exports.VehicleController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_service_1 = require("./vehicle.service");
const vehicle_dto_1 = require("./dto/vehicle.dto");
let VehicleController = class VehicleController {
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
    }
    async createCustomer(vehicledto) {
        return this.vehicleService.createVehicle(vehicledto);
    }
    async getAllVehicleByCity(city) {
        return await this.vehicleService.fetchAllVehicle(city);
    }
    async updateVehicleFromObject(vehicle_number) {
        return await this.vehicleService.updateVehicleStatus(vehicle_number);
    }
};
exports.VehicleController = VehicleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_dto_1.vehicleDto]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)(':city'),
    __param(0, (0, common_1.Param)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getAllVehicleByCity", null);
__decorate([
    (0, common_1.Patch)(':vehicle_number/release'),
    __param(0, (0, common_1.Param)('vehicle_number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "updateVehicleFromObject", null);
exports.VehicleController = VehicleController = __decorate([
    (0, common_1.Controller)('dispatch-locations'),
    __metadata("design:paramtypes", [vehicle_service_1.VehicleService])
], VehicleController);
//# sourceMappingURL=vehicle.controller.js.map