import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    vehicleNo: string;

    @Column({ default: 'AVAILABLE' })
    status: string;
    @Column()
    city:string;
  }
  