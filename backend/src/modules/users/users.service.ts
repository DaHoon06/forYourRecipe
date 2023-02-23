import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "../../models/user.model";
import {RegisteredUserDto} from "../../dtos/user/registered-user.dto";
import {UserDto} from "../../dtos/user/user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async findById(id: string): Promise<UserDto> {
        return this.userModel.findById(id)
    }

    async setUser(user: RegisteredUserDto): Promise<boolean> {
        const { id, name, email } = user
        const newUser = new User(id, name, email)
        const registeredUser = await new this.userModel(newUser).save()
        if (registeredUser) {return true}
        return false
    }

    async setFavoriteRecipes(recipeId: string, userId: string): Promise<boolean> {
        const {favoriteRecipes} = await this.userModel.findById(userId)
        const index = favoriteRecipes.indexOf(recipeId)
        if (index > -1) {
            favoriteRecipes.splice(index, 1)
        } else {
            favoriteRecipes.push(recipeId)
        }
        const { acknowledged } = await this.userModel.updateOne({_id: userId},{ $set: { favoriteRecipes: favoriteRecipes }})
        return acknowledged
    }
}
