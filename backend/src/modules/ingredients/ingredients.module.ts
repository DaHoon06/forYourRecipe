import { Module } from '@nestjs/common';
import { IngredientsController } from '@modules/ingredients/ingredients.controller';
import { IngredientsService } from '@modules/ingredients/ingredients.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Ingredient,
  IngredientSchema,
} from '@modules/ingredients/entities/ingredient.entity';
import { IngredientsRepository } from '@modules/ingredients/ingredients.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService, IngredientsRepository],
  exports: [IngredientsService, IngredientsModule],
})
export class IngredientsModule {}
