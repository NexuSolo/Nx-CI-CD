import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserHttpController } from './controllers/user-http.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, UserHttpController],
  providers: [AppService, UserService],
})
export class AppModule {}
