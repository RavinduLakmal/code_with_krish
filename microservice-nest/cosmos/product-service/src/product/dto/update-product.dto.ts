import { IsEnum } from "class-validator";

export enum ProductStatus{
    PENDING='PENDING',
    CONFIRMED='CONFIRMED',
    SHIPPED='SHIPPED',
    DELIVERED='DELIVERED',
    CANCELLED='CANCELLED'
}

export class UpdateProductStatus{
    @IsEnum(ProductStatus)
    status:ProductStatus;
}