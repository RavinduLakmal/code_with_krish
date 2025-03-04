import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './entity/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [VehicleService],
  controllers: [VehicleController],
  imports:[TypeOrmModule.forFeature([Vehicle])]
})
export class VehicleModule {}
