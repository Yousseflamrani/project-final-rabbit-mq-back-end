import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    handleNotification(data: string) {
        console.log('Notification received:', data);
        // Ajoutez votre logique de traitement de notification ici
    }
}
