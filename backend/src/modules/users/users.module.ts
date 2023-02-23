import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../../models/user.model";
import {IngredientsService} from "../ingredients/ingredients.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UsersModule]
})
export class UsersModule {}
