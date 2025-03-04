import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationService implements OnModuleInit {
    async onModuleInit() {
        await this.listenNotificationService()
    }

    private readonly kafka = new Kafka({
        brokers: ['3.0.159.213:9092']
    })

    // private readonly kafka = new Kafka({
    //     brokers: ['localhost:9092']
    // })
    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({ groupId: 'ravindu624-notification-service' });


    async listenNotificationService() {
        await this.consumer.subscribe({
            topic: `ravindulakmal624.order.create.notification`
        });

        await this.consumer.run({
            eachMessage: async ({ message }) => {
                console.log("notified",message)

            }
        }
        )
    }

}
