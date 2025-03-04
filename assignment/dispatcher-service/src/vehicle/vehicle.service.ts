import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Vehicle } from './entity/vehicle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { vehicleDto } from './dto/vehicle.dto';
import { Kafka } from 'kafkajs';
import Redis from 'ioredis';
import { UpdateVehicleStatus, VehicleStatus } from './dto/vehicle.updateStatus';

@Injectable()
export class VehicleService implements OnModuleInit {

    private readonly kafka = new Kafka({
        brokers: ['3.0.159.213:9092']
    })
    private readonly redis = new Redis({ host: '3.0.159.213', port: 6379 })

    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({ groupId: 'ravindu624-dispatcher-service' });

    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepo: Repository<Vehicle>,
    ) { }
    async onModuleInit() {

        await this.listenForVehicleService();
        // throw new Error('Method not implemented.');

    }



    async createVehicle(
        vehicledto: vehicleDto,
    ): Promise<Vehicle> {
        const vehicle = this.vehicleRepo.create(vehicledto);
        return this.vehicleRepo.save(vehicle);
    }


    async listenForVehicleService() {
        await this.consumer.subscribe({
            topic: `ravindulakmal624.order.confirm`
        });

        await this.consumer.run({
            eachMessage: async ({ message }) => {
                const { id, city } = JSON.parse(message.value.toString());
                const vehicles = await this.fetchAllVehicle(city);

                for (const vehicle of vehicles) {
                    const lockKey = `ravindu624:vehicle:${vehicle.vehicleNo}:lock`
                    const lock = await this.redis.set(lockKey, 'locked', 'EX', 3600 * 24, 'NX')
                    if (lock) {
                        console.log(`Order ${id} lock by this vehicle:${vehicle.vehicleNo} and vehicleKey:${lockKey}`)
                        const lockDelivery = `ravindu624:OrderID:${id}:lock`

                         await this.redis.set(lockDelivery, 'DELEIVERY', 'EX', 3600 * 24, 'NX')

                        
                        break;
                    } else {
                        console.log(` Order ${id} locked by this vehicle:${vehicle.vehicleNo} and vehicleKey:${lockKey}`)

                    }

                }

               


            }
        }
        )
    }


    async updateVehicleStatus(vehicleNo: string) {

        const lockKey = `ravindu624:vehicle:${vehicleNo}:lock`;

        await this.redis.del(lockKey);



        return { value: `You can use a vehicle :${vehicleNo} for your delivery` }


    }

    async fetchAllVehicle(city: string) {
        return await this.vehicleRepo.find({ where: { city } });

    }

}
