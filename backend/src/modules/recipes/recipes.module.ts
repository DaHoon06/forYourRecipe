import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Recipe, RecipeSchema} from "../../models/recipe.model";
import {IngredientsModule} from "../ingredients/ingredients.module";
import {IngredientsService} from "../ingredients/ingredients.service";
import {Ingredient, IngredientSchema} from "../../models/ingredient.model";
import {User, UserSchema} from "../../models/user.model";
import {UsersService} from "../users/users.service";

@Module({
  imports: [
      IngredientsModule,
      MongooseModule.forFeature([
          { name: Recipe.name, schema: RecipeSchema },
          { name: Ingredient.name, schema: IngredientSchema },
          { name: User.name, schema: UserSchema },
      ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService, IngredientsService, UsersService]
})
export class RecipesModule {}
