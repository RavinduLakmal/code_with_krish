import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { createOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';

@Injectable()
export class OrdersService {

    constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>,
        @InjectRepository(OrderItem) private readonly orderItemRepo: Repository<OrderItem>
    ) {

    }

    async create(createOrderDto: createOrderDto): Promise<Order | null> {

        const { customerId, items } = createOrderDto;
        const order = this.orderRepo.create({ customerId, status: 'PENDING' }); // create mean create a memeory from stack or heap in mysql

        const savedOrder = await this.orderRepo.save(order); // values input to that allocated space


        const orderItems = items.map((i) =>
            this.orderItemRepo.create({
                productId: i.prductId,
                price: i.price,
                quantity: i.quantity,
                order: savedOrder
            })
        );

        await this.orderItemRepo.save(orderItems);

        return this.orderRepo.findOne({
            where: { id: savedOrder.id },
            relations: ['items'],
        });


    }


    async fetch(id: any) {

        return await this.orderRepo.findOne({
            where: { id },
            relations: ['items'],
        });

    }

    async fetchAll() {
        return await this.orderRepo.find({ relations: ['items'] })
    }

    async updateOrderStatus(id: number, updateStatus: UpdateOrderStatus) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException(`order with id: ${id} is not found`);
        }

        if (order.status === OrderStatus.DELIVERED ||
            order.status === OrderStatus.CANCELLED
        ) {

            throw new BadRequestException(`order status cannot be changed when its deliverd or cancelled `);
        }

        order.status=updateStatus.status;

        return await this.orderRepo.save(order);

    }

}



// /** */