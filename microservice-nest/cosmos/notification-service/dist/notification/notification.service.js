"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
let NotificationService = class NotificationService {
    async onModuleInit() {
        await this.listenNotificationService();
    }
    kafka = new kafkajs_1.Kafka({
        brokers: ['localhost:9092']
    });
    producer = this.kafka.producer();
    consumer = this.kafka.consumer({ groupId: 'ravindu624-notification-service' });
    async listenNotificationService() {
        await this.consumer.subscribe({
            topic: `ravindulakmal624.order.create.notification`
        });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                console.log("notified", message);
            }
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)()
], NotificationService);
//# sourceMappingURL=notification.service.js.map