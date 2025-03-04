import { OnModuleInit } from '@nestjs/common';
export declare class NotificationService implements OnModuleInit {
    onModuleInit(): Promise<void>;
    private readonly kafka;
    private readonly producer;
    private readonly consumer;
    listenNotificationService(): Promise<void>;
}
