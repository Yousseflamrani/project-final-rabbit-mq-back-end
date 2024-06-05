import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    private chatService;
    private jwtService;
    private client;
    constructor(chatService: ChatService, jwtService: JwtService, client: ClientProxy);
    server: Server;
    onModuleInit(): void;
    handleIncomingMessage(message: any): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleMessage(body: {
        content: string;
        recipientId: number;
    }, client: Socket): Promise<void>;
    afterInit(server: Server): void;
}
