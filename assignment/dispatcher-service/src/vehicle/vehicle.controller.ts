import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { vehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';

@Controller('dispatch-locations')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    @Post()
    async createCustomer(
      @Body() vehicledto: vehicleDto,
    ): Promise<Vehicle> {
      return this.vehicleService.createVehicle(vehicledto);
    }

    @Get(':city')
    async getAllVehicleByCity(@Param('city') city){
        return await this.vehicleService.fetchAllVehicle(city);

    }

  

    @Patch(':vehicle_number/release')
    async updateVehicleFromObject(@Param('vehicle_number') vehicle_number ){ 

        return await this.vehicleService.updateVehicleStatus(vehicle_number);

    }


}
