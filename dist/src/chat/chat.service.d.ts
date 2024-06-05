import { PrismaService } from "../../prisma/prisma.service";
import { Message } from '@prisma/client';
export declare class ChatService {
    private prisma;
    private client;
    constructor(prisma: PrismaService);
    createMessage(content: string, userId: number): Promise<Message>;
    findAllMessages(): Promise<Message[]>;
}
