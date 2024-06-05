import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import {PrismaModule} from "../../prisma/primsa.module";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: 'your_jwt_secret',
            signOptions: { expiresIn: '60m' },
        }),
        ClientsModule.register([
            {
                name: 'CHAT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'chat_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    providers: [ChatGateway, ChatService],
})
export class ChatModule {}
