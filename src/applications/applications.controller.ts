import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

// 装饰异常Filter
@UseFilters(new HttpExceptionFilter())
// 添加局部守卫
@UseGuards(RolesGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get()
  // 自定义装饰器 Roles
  @Roles('admin')
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get('queryOne')
  findOne(@Query('id') id: string) {
    // 这里有个坑：@Params方式不行，因为默认id参数是必填的，所以id就一定存在，则不会触发
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '请求参数id 必传',
          error: 'id is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    // +号是把string类型转为number类型
    return this.applicationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }

  @Get('fromUser/:userid')
  findAllAppByUserId(@Param('userid') user_id: string) {
    return this.applicationsService.findAllAppByUserId(user_id);
  }
}
