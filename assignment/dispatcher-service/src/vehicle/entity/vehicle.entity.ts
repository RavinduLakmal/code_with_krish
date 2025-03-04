import { IsNotEmpty } from 'class-validator';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
  
  @Entity()
  export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique:true})
    @IsNotEmpty()
    vehicleNo: string;

    @Column({ default: 'AVAILABLE' })
    status: string;
    @Column()
    city:string;
  }
  