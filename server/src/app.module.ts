import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserStatusGateway } from './user-status.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserStatusGateway],
})
export class AppModule {}
