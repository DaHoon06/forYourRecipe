import { Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../models/user.model';
import { RegisteredUserDto } from '../../dtos/user/registered-user.dto';
import { UserDto } from '../../dtos/user/user.dto';
import { GlobalFilter } from '../../lib/global.filter';

@UseFilters(new GlobalFilter())
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<UserDto> {
    return this.userModel.findById(id);
  }

  async setUser(user: RegisteredUserDto): Promise<UserDto> {
    const { id, name, email } = user;
    const foundUser = await this.userModel.findById(id);
    if (!foundUser) {
      const newUser = new User(id, name, email);
      const registeredUser = await new this.userModel(newUser).save();

      return this.getUserDto(registeredUser);
    }
    return this.getUserDto(foundUser);
  }

  async setFavoriteRecipes(
    recipeId: string,
    userId: string,
  ): Promise<string[]> {
    const { favoriteRecipes } = await this.userModel.findById(userId);
    const index = favoriteRecipes.indexOf(recipeId);
    if (index > -1) {
      favoriteRecipes.splice(index, 1);
    } else {
      favoriteRecipes.push(recipeId);
    }
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { favoriteRecipes: favoriteRecipes } },
    );
    return favoriteRecipes;
  }

  private getUserDto(user: User): UserDto {
    return new UserDto(
      user._id,
      user.name,
      user.email,
      user.createdAt,
      user.updatedAt,
      user.img,
      user.favoriteRecipes,
      user.myRecipes,
    );
  }
}
