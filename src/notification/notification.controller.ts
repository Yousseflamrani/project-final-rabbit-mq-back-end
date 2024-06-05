import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @MessagePattern({ cmd: 'notify' })
    handleNotification(data: string) {
        this.notificationService.handleNotification(data);
    }
}
