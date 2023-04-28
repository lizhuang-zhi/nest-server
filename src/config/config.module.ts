import { Module, Global, DynamicModule } from '@nestjs/common';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(option: string): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: {
            shopName: '全局模块' + option,
          },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: {
            shopName: '全局模块' + option,
          },
        },
      ],
    };
  }
}
