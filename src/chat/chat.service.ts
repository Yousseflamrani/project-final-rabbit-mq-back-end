import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ChatService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'notification_queue',
                queueOptions: {
                    durable: false
                },
            },
        });
    }

    sendMessage(message: string) {
        return this.client.send({ cmd: 'notify' }, message);
    }

    async createMessage(content: string, userId) {
        
    }
}
