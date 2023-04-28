import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CounterMiddleware } from '../counter/counter.middleware';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  // providers的几种形式
  providers: [
    // 这个对象如果不在users.controller.ts中注入，则会报错
    {
      provide: 'users',
      useClass: UsersService,
    },
    // 值的注入形式
    {
      provide: 'userList',
      useValue: ['Leo', 'Morning', 'Tom'],
    },
    // 工厂的注入形式（函数）
    {
      provide: 'userFactory',
      useFactory() {
        return 'userFactory Function';
      },
    },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 局部中间件：拦截所有 /users 路由的 GET 请求
    // 局部中间件：拦截所有 /users/queryall 路由的 GET 请求
    consumer
      .apply(CounterMiddleware)
      .forRoutes(
        { path: '/users', method: RequestMethod.GET },
        { path: '/users/queryall', method: RequestMethod.GET },
      );
  }
}
