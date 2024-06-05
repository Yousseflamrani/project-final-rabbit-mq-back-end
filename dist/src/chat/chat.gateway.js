"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ChatGateway = class ChatGateway {
    constructor(chatService, jwtService, client) {
        this.chatService = chatService;
        this.jwtService = jwtService;
        this.client = client;
    }
    onModuleInit() {
        this.client.connect();
        const message$ = this.client.send({ cmd: 'chat_message' }, {});
        message$.subscribe((message) => this.handleIncomingMessage(message));
    }
    handleIncomingMessage(message) {
        this.server.emit('newMessage', message);
    }
    async handleConnection(client) {
        const token = client.handshake.query.token;
        try {
            if (typeof token === 'string') {
                const user = this.jwtService.verify(token);
                client.join(user.userId.toString());
            }
        }
        catch (err) {
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        client.rooms.forEach(room => client.leave(room));
    }
    async handleMessage(body, client) {
        const token = client.handshake.query.token;
        if (typeof token === 'string') {
            const user = this.jwtService.verify(token);
            const message = await this.chatService.createMessage(body.content, user.userId);
            this.server.to(body.recipientId.toString()).emit('newMessage', message);
            this.client.emit('chat_message', message);
        }
    }
    afterInit(server) {
        console.log('WebSocket Gateway initialized');
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(2, (0, common_1.Inject)('CHAT_SERVICE')),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        jwt_1.JwtService,
        microservices_1.ClientProxy])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map