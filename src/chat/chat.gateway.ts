import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@WebSocketGateway()
export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    constructor(
        private chatService: ChatService,
        private jwtService: JwtService,
        @Inject('CHAT_SERVICE') private client: ClientProxy,
    ) {}

    @WebSocketServer() server: Server;

    onModuleInit() {
        this.client.connect();
        const message$: Observable<any> = this.client.send({ cmd: 'chat_message' }, {});
        message$.subscribe((message: any) => this.handleIncomingMessage(message));
    }

    handleIncomingMessage(message: any) {
        this.server.emit('newMessage', message);
    }

    async handleConnection(client: Socket) {
        const token = client.handshake.query.token;
        try {
            if (typeof token === 'string') {
                const user = this.jwtService.verify(token);
                client.join(user.userId.toString());
            }
        } catch (err) {
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        client.rooms.forEach(room => client.leave(room));
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody() body: { content: string, recipientId: number },
        @ConnectedSocket() client: Socket,
    ) {
        const token = client.handshake.query.token;
        if (typeof token === 'string') {
            const user = this.jwtService.verify(token);
            const message = await this.chatService.createMessage(body.content, user.userId);
            this.server.to(body.recipientId.toString()).emit('newMessage', message);
            this.client.emit('chat_message', message);
        }
    }

    afterInit(server: Server) {
        console.log('WebSocket Gateway initialized');
    }
}
