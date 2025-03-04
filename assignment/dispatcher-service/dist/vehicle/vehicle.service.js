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
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const vehicle_entity_1 = require("./entity/vehicle.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const kafkajs_1 = require("kafkajs");
const ioredis_1 = require("ioredis");
let VehicleService = class VehicleService {
    constructor(vehicleRepo) {
        this.vehicleRepo = vehicleRepo;
        this.kafka = new kafkajs_1.Kafka({
            brokers: ['3.0.159.213:9092']
        });
        this.redis = new ioredis_1.default({ host: '3.0.159.213', port: 6379 });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'ravindu624-dispatcher-service' });
    }
    async onModuleInit() {
        await this.listenForVehicleService();
    }
    async createVehicle(vehicledto) {
        const vehicle = this.vehicleRepo.create(vehicledto);
        return this.vehicleRepo.save(vehicle);
    }
    async listenForVehicleService() {
        await this.consumer.subscribe({
            topic: `ravindulakmal624.order.confirm`
        });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                const { id, city } = JSON.parse(message.value.toString());
                console.log(" ========== ", city);
                const vehicles = await this.fetchAllVehicle(city);
                console.log(vehicles, "------->");
                for (const vehicle of vehicles) {
                    const lockKey = `ravindu624:vehicle:${vehicle.vehicleNo}:lock`;
                    const lock = await this.redis.set(lockKey, 'locked', 'EX', 3600 * 24, 'NX');
                    if (lock) {
                        console.log(`lock by this vehicle:${vehicle.vehicleNo} and vehicleKey:${lockKey}`);
                        break;
                    }
                    else {
                        console.log(`locked by this vehicle:${vehicle.vehicleNo} and vehicleKey:${lockKey}`);
                    }
                }
            }
        });
    }
    async updateVehicleStatus(vehicleNo) {
        const lockKey = `ravindu624:vehicle:${vehicleNo}:lock`;
        await this.redis.del(lockKey);
        return { value: `You can use a vehicle :${vehicleNo} for your delivery` };
    }
    async fetchAllVehicle(city) {
        return await this.vehicleRepo.find({ where: { city } });
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map