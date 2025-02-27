import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,Unique } from "typeorm";


@Entity()
export class Customer{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @CreateDateColumn()
    createdAt:Date;
    @Column({unique:true})
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @Column()
    address:string;
    @Column({default:'PENDING'})
    status:string;

}

// function isUnique(arg0: { tableName: string; column: string; }): (target: Customer, propertyKey: "email") => void {
//     throw new Error("Function not implemented.");
// }
