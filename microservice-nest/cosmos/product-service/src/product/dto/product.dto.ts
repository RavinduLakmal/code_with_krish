import { IsInt } from "class-validator";

export class ProductDto {
    @IsInt()
    quantity: number;
    price: number;
    name: string;

}