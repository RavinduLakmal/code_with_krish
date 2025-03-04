import { Module } from '@nestjs/common';

import { VehicleModule } from './vehicle/vehicle.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle/entity/vehicle.entity';

@Module({
  imports: [VehicleModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOSTNAME || 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'cosmos_2',
    entities: [Vehicle],
    synchronize: true, //only on dev
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
