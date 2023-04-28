import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BoyModule } from './boy/boy.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-server'),
    UsersModule,
    BoyModule,
    // 手动加入全局模块
    ConfigModule.forRoot('：传入的动态内容'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
