import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as winston from 'winston';

// 创建日志Logger对象，配置日志基本信息
const logger = winston.createLogger({
  level: 'info', // 日志级别
  format: winston.format.json(), // 日志格式
  transports: [
    new winston.transports.File({ filename: 'logs/app.log' }), // 将日志输出到文件
    // new winston.transports.Console(), // 将日志输出到控制台
  ],
});

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, path, ip, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    // 记录日志
    logger.info(`${method} ${path} ${ip} ${originalUrl} ${userAgent}`);
    next();
  }
}
