export declare class ChatService {
    private client;
    constructor();
    sendMessage(message: string): import("rxjs").Observable<any>;
    createMessage(content: string, userId: any): Promise<void>;
}
