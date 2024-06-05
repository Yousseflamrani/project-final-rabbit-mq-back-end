import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule} from "../prisma/primsa.module";

@Module({
  imports: [AuthModule, UsersModule, ChatModule, PrismaModule],
})
export class AppModule {}
