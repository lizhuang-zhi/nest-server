import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CounterMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.send('禁止访问，您被拦截了');
    // console.log('已经进入中间件.....');
    // next();
  }
}
