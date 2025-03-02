import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { createOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
import { lastValueFrom } from 'rxjs';
import {OrderApiBase,OrderApi} from "./dto/api-url";



@Injectable()
export class OrdersService {

    constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>,
        @InjectRepository(OrderItem) private readonly orderItemRepo: Repository<OrderItem>,
        private readonly httpService: HttpService
    ) {

    }

    /**
     * Create Order by after validate stock and customer*
     * @param createOrderDto
     */

    async create(createOrderDto: createOrderDto): Promise<Order | null> {

        try {
            const { customerId, items } = createOrderDto;
            const customer = await this.getCustomer_forOrderCreate(customerId);


            const value = await Promise.allSettled(
                items.map(async (i) => {
                    try {
                        const resp = await this.validateQuantityIsAvailbleForOrderOrNot(i.prductId, i.quantity);

                        if (!resp.data.available) {
                            throw new NotFoundException(`Qty is not enough when ${resp.data.name} `)
                            // break;
                        }
                    } catch (error) {
                        throw new NotFoundException(` ${error.message}`);
                    }
                })
            )

            value.forEach((res,index)=>{
                if (res.status === 'rejected') {
                    throw new NotFoundException(`${res.reason}`)

                  }
            })


            const order = this.orderRepo.create({ customerId: customer.data.id, status: 'PENDING' }); 

            const savedOrder = await this.orderRepo.save(order); 


            const orderItems = items.map((i) =>
                this.orderItemRepo.create({
                    productId: i.prductId,
                    price: i.price,
                    quantity: i.quantity,
                    order: savedOrder
                })
            );

           const orderWasCreate= await this.orderItemRepo.save(orderItems);

           if(orderWasCreate){
            orderItems.map(async (i)=>
               await this.reduceQuantityFromDB(i.productId,i.quantity)

            );
           }

            return this.orderRepo.findOne({
                where: { id: savedOrder.id },
                relations: ['items'],
            });
        } catch (error: any) {
            return (error)
        }


    }


    /**
     * fetch customer by Id*
     * @param id
     */
    async fetch(id: any) {

        const response = await this.orderRepo.findOne({
            where: { id },
            relations: ['items'],
        });
        const customer = await this.getCustomer_forOrderCreate(response?.customerId);
        return ({
            ...response,
            customer: customer.data
        })
    }

    /**
     * *
     */

    async fetchAll() {
        return await this.orderRepo.find({ relations: ['items'] })
    }

    /**
     * *
     * @param id
     * @param updateStatus
     */

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

        order.status = updateStatus.status;

        return await this.orderRepo.save(order);

    }

    /**
     * get customer for validate call to customer service*
     * @param id
     */

    async getCustomer_forOrderCreate(id: any) {

        try {
            const response = await lastValueFrom(this.httpService.get(`${OrderApi.CUSTOMER}/${id}`));


            return response;
        } catch (error) {
            throw error;
        }

    }

    /**
     *  get Stock for validate call to Product service*
     * @param id
     * @param qty
     */

    async validateQuantityIsAvailbleForOrderOrNot(id: any, qty: any) {

        try {
            const response = await lastValueFrom(this.httpService.get(`${OrderApi.PRODUCT}/${id}/validate?quantity=${qty}`));

            return response;
        } catch (error) {
            throw error;
        }

    }

    /**
     *
     * @param id
     * @param qty
     */

    async reduceQuantityFromDB(id: any, qty: any) {

        try {
            const response = await lastValueFrom(this.httpService.get(`${OrderApi.PRODUCT}/${id}/reduce/stock?quantity=${qty}`));
            return response;
        } catch (error) {
            throw error;
        }

    }
}



