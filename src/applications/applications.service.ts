import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import {
  Application,
  ApplicationDocument,
} from './entities/application.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<ApplicationDocument>,
  ) {}

  create(createApplicationDto: CreateApplicationDto) {
    return 'This action adds a new application';
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }

  // 通过userid查询该用户所有的application
  async findAllAppByUserId(userId: string): Promise<Application[]> {
    return this.applicationModel
      .find({
        user_id: userId,
      })
      .exec();
  }
}
