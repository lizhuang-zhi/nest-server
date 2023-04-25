import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '账号', example: '2315831906@qq.com' })
  @IsString()
  @IsNotEmpty()
  account?: string;
  @ApiProperty({ description: '密码', example: '123123' })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ description: '昵称', example: '金州拉文' })
  @IsString()
  nickname: string;
  @ApiProperty({ description: '性别', example: 0 })
  @IsNotEmpty()
  gender: number;
}
