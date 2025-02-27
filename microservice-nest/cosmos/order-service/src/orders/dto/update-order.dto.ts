import { IsEnum, isEnum } from "class-validator";

export enum OrderStatus{
    PENDING='PENDING',
    CONFIRMED='CONFIRMED',
    SHIPPED='SHIPPED',
    DELIVERED='DELIVERED',
    CANCELLED='CANCELLED'
}

export class UpdateOrderStatus{
    @IsEnum(OrderStatus)
    status:OrderStatus;
}
