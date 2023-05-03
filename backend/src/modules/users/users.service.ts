import { Injectable, UseFilters } from '@nestjs/common';
import { User } from '@modules/users/entities/user.entity';
import { UserDto } from '@modules/users/dto/user.dto';
import { GlobalFilter } from '@src/lib/global.filter';
import {UsersRepository} from "@modules/users/users.repository";

@UseFilters(new GlobalFilter())
@Injectable()
export class UsersService {
  constructor( private readonly usersRepository: UsersRepository ) {}

  async findById(id: string) {
    return this.usersRepository.findById(id);
  }

  async signIn(id: string, name: string, email: string): Promise<UserDto> {
    const foundUser = await this.usersRepository.findById(id);
    if (!foundUser) {
      const newUser = new User(id, name, email);
      const registeredUser = await this.usersRepository.setUser(newUser);
      return this.getUserDto(registeredUser);
    }
    return this.getUserDto(foundUser);
  }

  async setFavoriteRecipes(recipeId: string, userId: string): Promise<string[]> {
    const { favoriteRecipes } = await this.usersRepository.findById(userId);
    const index = favoriteRecipes.indexOf(recipeId);
    if (index > -1) {
      favoriteRecipes.splice(index, 1);
    } else {
      favoriteRecipes.push(recipeId);
    }
    await this.usersRepository.updateOne(userId, favoriteRecipes);
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
      user.introduce,
    );
  }
}
