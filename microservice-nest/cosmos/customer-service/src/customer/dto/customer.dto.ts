import { IsEmail } from "class-validator";

export class CustomerDto{
    name:string;
    @IsEmail()
    email:string;
    address:string;

}