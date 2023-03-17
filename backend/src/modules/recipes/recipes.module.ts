import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.entity';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { IngredientsService } from '../ingredients/ingredients.service';
import { Ingredient, IngredientSchema } from '../ingredients/entities/ingredient.entity';
import { User, UserSchema } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RecipeRepository } from './recipe.repository';

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
  providers: [
    RecipesService,
    IngredientsService,
    UsersService,
    RecipeRepository,
  ],
})
export class RecipesModule {}
