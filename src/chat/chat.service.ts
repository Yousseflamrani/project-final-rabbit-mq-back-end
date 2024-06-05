import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PrismaService} from "../../prisma/prisma.service";
import { Message } from '@prisma/client';

@Injectable()
export class ChatService {
    private client: ClientProxy;

    constructor(private prisma: PrismaService) {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'chat_queue',
                queueOptions: {
                    durable: false,
                },
            },
        });
    }

    async createMessage(content: string, userId: number): Promise<Message> {
        const message = await this.prisma.message.create({
            data: {
                content,
                userId,
            },
        });
        // Envoie le message à RabbitMQ
        this.client.emit('chat_message', message);
        return message;
    }

    async findAllMessages(): Promise<Message[]> {
        return this.prisma.message.findMany({
            include: {
                user: true,
            },
        });
    }
}
