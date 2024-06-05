import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {PrismaModule} from "../prisma/primsa.module";

@Module({
  imports: [
    NotificationModule,
    ChatModule,
    AuthModule,
    UsersModule,
    PrismaModule,
  ],
})
export class AppModule {}
