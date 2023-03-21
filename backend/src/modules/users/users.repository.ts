import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@modules/users/entities/user.entity';
import { Model } from 'mongoose';
import { UserDto } from '@modules/users/dto/user.dto';
import { RegisteredUserDto } from '@modules/users/dto/registered-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<UserDto> {
    return this.userModel.findById(id);
  }

  async setUser(user: RegisteredUserDto): Promise<User> {
    return await new this.userModel(user).save();
  }
}
