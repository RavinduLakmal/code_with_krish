import { VehicleService } from './vehicle.service';
import { vehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';
export declare class VehicleController {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    createCustomer(vehicledto: vehicleDto): Promise<Vehicle>;
    getAllVehicleByCity(city: any): Promise<Vehicle[]>;
    updateVehicleFromObject(vehicle_number: any): Promise<{
        value: string;
    }>;
}
