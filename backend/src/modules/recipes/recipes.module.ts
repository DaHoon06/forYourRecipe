import { forwardRef, Module } from '@nestjs/common';
import { RecipesController } from '@modules/recipes/recipes.controller';
import { RecipesService } from '@modules/recipes/recipes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from '@modules/recipes/entities/recipe.entity';
import { IngredientsModule } from '@modules/ingredients/ingredients.module';
import { IngredientsService } from '@modules/ingredients/ingredients.service';
import { Ingredient, IngredientSchema } from '@modules/ingredients/entities/ingredient.entity';
import { RecipeRepository } from '@modules/recipes/recipe.repository';
import { S3Service } from '@src/providers/aws/s3/s3.service';
import { UsersModule } from "@modules/users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema },]),
    forwardRef(() => UsersModule),
    forwardRef(() => IngredientsModule)
  ],
  controllers: [RecipesController],
  providers: [ RecipesService, RecipeRepository, S3Service ],
})
export class RecipesModule {}
