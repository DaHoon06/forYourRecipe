import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Recipe, RecipeSchema} from "../../models/recipe.model";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Recipe.name, schema: RecipeSchema}]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService]
})
export class RecipesModule {}
