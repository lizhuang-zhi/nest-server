import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Request,
  Query,
  Param,
  // 获取请求头信息装饰器
  Headers,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}
  constructor(
    // 分别对应users.module.ts中的provide
    @Inject('users') private readonly usersService: UsersService,
    @Inject('userList') private readonly userList: string[],
    @Inject('userFactory') private readonly userFactory: string,
  ) {}

  @Get()
  getHeader(@Headers() header) {
    console.log(header);
    // {
    //   'user-agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
    //   accept: '*/*',
    //   host: 'localhost:3000',
    //   'accept-encoding': 'gzip, deflate, br',
    //   connection: 'keep-alive'
    // }
  }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  /* 
    @Request装饰器：
  */
  @Post('register_request')
  createRequest(@Request() req) {
    return this.usersService.create(req.body);
  }

  @Get('queryall')
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  /* 
    @Request装饰器：
    - 请求形式: http://localhost:3000/users/query_request_params?id=2

    由于已经存在同层级路由为/query的get请求，
    所以这里不可以声明为/query/request，但
    可以声明为/query_request，因为第一层没
    有相同
  */
  @Get('query_request_query')
  findOneRequestQuery(@Request() req) {
    return this.usersService.findOne(req.query.id);
  }

  /* 
    @Query装饰器：
  */
  @Get('query_query')
  findOneQuery(@Query() query) {
    return this.usersService.findOne(query.id);
  }

  /* 
    动态路由形式
    - 请求形式: http://localhost:3000/users/query_request_params/2/leo
  */
  @Get('query_request_params/:id/:name')
  findOneRequestParams(@Request() req) {
    return this.usersService.findOne(req.params.id);
  }

  @Get('query/:id')
  findOneParam(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /* 
    返回注入的 userList
    - 请求形式: http://localhost:3000/users/inject_userList
  */
  @Get('inject_userList')
  injectUserList() {
    return this.userList;
    /* 
      [
        "Leo",
        "Morning",
        "Tom"
      ]
    */
  }

  /* 
    返回注入的 userFactory
    - 请求形式: http://localhost:3000/users/inject_userFactory
  */
  @Get('inject_userFactory')
  injectUserFactory() {
    return this.userFactory;
    /* 
      userFactory Function
    */
  }
}
