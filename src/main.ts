import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';

function MiddleWareAll(req: any, res: any, next: any) {
  console.log('已进入全局中间件.....');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用第三方中间件
  app.use(cors());
  // 全局引入使用全局中间件
  app.use(MiddleWareAll);

  // 全局过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());

  // 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-server api document')
    .setDescription('nest server project api document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('server-doc', app, document);

  await app.listen(3000);
}
bootstrap();
