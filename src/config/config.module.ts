import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'Config',
      useValue: {
        shopName: '全局模块',
      },
    },
  ],
  exports: [
    {
      provide: 'Config',
      useValue: {
        shopName: '全局模块',
      },
    },
  ],
})
export class ConfigModule {}
