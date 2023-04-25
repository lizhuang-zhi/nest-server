import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    const { id } = payload;
    const user = await this.usersService.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.account };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
