import { IsEnum } from "class-validator";

export enum VehicleStatus{
    PENDING='PENDING',
    CONFIRMED='CONFIRMED',
    SHIPPED='SHIPPED',
    DELIVERED='DELIVERED',
    CANCELLED='CANCELLED'
}

export class UpdateVehicleStatus{
    @IsEnum(VehicleStatus)
    status:VehicleStatus;
}