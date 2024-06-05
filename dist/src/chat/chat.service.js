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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const prisma_service_1 = require("../../prisma/prisma.service");
let ChatService = class ChatService {
    constructor(prisma) {
        this.prisma = prisma;
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'chat_queue',
                queueOptions: {
                    durable: false,
                },
            },
        });
    }
    async createMessage(content, userId) {
        const message = await this.prisma.message.create({
            data: {
                content,
                userId,
            },
        });
        this.client.emit('chat_message', message);
        return message;
    }
    async findAllMessages() {
        return this.prisma.message.findMany({
            include: {
                user: true,
            },
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map