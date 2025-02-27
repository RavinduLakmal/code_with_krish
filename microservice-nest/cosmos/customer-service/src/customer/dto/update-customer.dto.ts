import { IsEnum } from "class-validator";

export enum CustomerStatus{
    PENDING='PENDING',
    CONFIRMED='CONFIRMED',
    SHIPPED='SHIPPED',
    DELIVERED='DELIVERED',
    CANCELLED='CANCELLED'
}

export class UpdateCustomerStatus{
    @IsEnum(CustomerStatus)
    status:CustomerStatus;
}