import { Module } from '@nestjs/common';
import { RecipesController } from '@modules/recipes/recipes.controller';
import { RecipesService } from '@modules/recipes/recipes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from '@modules/recipes/entities/recipe.entity';
import { IngredientsModule } from '@modules/ingredients/ingredients.module';
import { IngredientsService } from '@modules/ingredients/ingredients.service';
import {
  Ingredient,
  IngredientSchema,
} from '@modules/ingredients/entities/ingredient.entity';
import { User, UserSchema } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/users.service';
import { RecipeRepository } from '@modules/recipes/recipe.repository';
import { S3Service } from '@src/providers/aws/s3/s3.service';

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
    S3Service,
  ],
})
export class RecipesModule {}
