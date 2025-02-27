import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
   id:number;
   @Column()
   productId:number | 1;
    @Column('decimal')
   price:number;
   @Column()
   quantity:number; 
   @ManyToOne(()=>Order,(order)=>order.items,{
    onDelete:'CASCADE'
   })
   order:Order
}