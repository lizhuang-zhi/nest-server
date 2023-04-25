import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly authService: AuthService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // TODO：通过account，判断用户是否已经存在
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    var resultData: any = await this.userModel.findById(id).exec();
    var backValue: any;
    if (resultData) {
      var res: any = await this.authService.login(resultData)
      backValue = {
        ...resultData._doc,
        ...res
      }
      return backValue;
    } else {
      return resultData;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // TODO：验证token
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<User> {
    // TODO：验证token
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
