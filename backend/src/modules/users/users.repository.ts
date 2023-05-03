import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@modules/users/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async setUser(user: User): Promise<User> {
    return await new this.userModel(user).save();
  }

  async updateOne(_id: string, favoriteRecipes: string[]) {
    return this.userModel.updateOne({ _id }, { $set: { favoriteRecipes } },)
  }
}
