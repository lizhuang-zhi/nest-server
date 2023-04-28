import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function MiddleWareAll(req: any, res: any, next: any) {
  console.log('已进入全局中间件.....');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局引入使用全局中间件
  app.use(MiddleWareAll);
  await app.listen(3000);
}
bootstrap();
