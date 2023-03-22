import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Recipe,
  RecipeDocument,
} from '@modules/recipes/entities/recipe.entity';
import { Model } from 'mongoose';
import { UpdatedUserRecipeDto } from '@modules/recipes/dto/updated-user-recipe.dto';

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  async findAllRecipe(page: number): Promise<Recipe[]> {
    return this.recipeModel.find().sort({ updatedAt: 1 }).limit(8).skip(page);
  }

  /**
   * @description: 오늘의 추천 레시피 조회
   */
  async todayRandomRecipe() {
    return this.recipeModel.aggregate([{ $sample: { size: 8 } }]);
  }

  /**
   * @description: 레시피 이미지 업데이트
   * @param _id
   * @param Location
   */
  async recipeImageUpdate(_id: string, Location: string) {
    return this.recipeModel.updateOne(
      { _id },
      {
        $set: {
          profileImage: Location,
        },
      },
    );
  }

  async updateOneRecipe(recipe: UpdatedUserRecipeDto) {
    const { id, name, user, desc, allIngredient, steps, profileImage } = recipe;
    const { acknowledged } = await this.recipeModel.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          desc: desc,
          user: user,
          updatedAt: new Date(),
          allIngredient: allIngredient,
          steps: steps,
          profileImage: profileImage,
        },
      },
    );
    return acknowledged;
  }
}
