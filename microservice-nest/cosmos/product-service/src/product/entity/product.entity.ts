import { IsInt } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @CreateDateColumn()
    createdAt:Date;
    // @Column({ type: "decimal", precision: 10, scale: 2 })
    @Column('decimal')
    price: number;
    @Column()
    @IsInt()
    quantity:number;
    @Column({default:'PENDING'})
    status:string;

}