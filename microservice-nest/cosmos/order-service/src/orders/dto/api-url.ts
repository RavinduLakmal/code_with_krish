import { IsEnum, isEnum } from "class-validator";

export enum OrderApi{
    CUSTOMER="http://localhost:3002/customer",
    PRODUCT="http://localhost:3001/products"
}

export class OrderApiBase{
    @IsEnum(OrderApi)
    URL:OrderApi;
    
}