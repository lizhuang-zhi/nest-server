import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ description: '用户id', example: '2315831906@qq.com' })
  @IsString()
  @IsNotEmpty()
  user_id?: string;

  @ApiProperty({ description: '应用名称', example: 'Leo学习网站' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '应用描述', example: '这是一个个人学习分享网站' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: '应用类型', example: 0 })
  @IsNotEmpty()
  type: number; // 0-web类型  1-小程序类型  2-server类型
}
