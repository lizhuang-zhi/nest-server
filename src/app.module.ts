import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BoyModule } from './boy/boy.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-server'),
    UsersModule,
    BoyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
