import { OnModuleInit } from '@nestjs/common';
import { Vehicle } from './entity/vehicle.entity';
import { Repository } from 'typeorm';
import { vehicleDto } from './dto/vehicle.dto';
export declare class VehicleService implements OnModuleInit {
    private readonly vehicleRepo;
    private readonly kafka;
    private readonly redis;
    private readonly producer;
    private readonly consumer;
    constructor(vehicleRepo: Repository<Vehicle>);
    onModuleInit(): Promise<void>;
    createVehicle(vehicledto: vehicleDto): Promise<Vehicle>;
    listenForVehicleService(): Promise<void>;
    updateVehicleStatus(vehicleNo: string): Promise<{
        value: string;
    }>;
    fetchAllVehicle(city: string): Promise<Vehicle[]>;
}
