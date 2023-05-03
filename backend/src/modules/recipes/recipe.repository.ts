import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {
  Recipe,
  RecipeDocument,
} from '@modules/recipes/entities/recipe.entity';
import {Model} from 'mongoose';
import {UpdatedUserRecipeDto} from '@modules/recipes/dto/updated-user-recipe.dto';
import {AllIngredientDto} from "@modules/ingredients/dto/all-ingredient.dto";
import {StepsDto} from "@modules/recipes/dto/steps.dto";

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {
  }

  async findAllRecipe(page: number): Promise<Recipe[]> {
    return this.recipeModel
      .find({deleted: false})
      .sort({updatedAt: 1})
      .limit(8)
      .skip(page);
  }

  async findOneRecipeById(_id: string): Promise<Recipe> {
    return this.recipeModel.findOne({_id});
  }

  async findRecipesByIngredient(ingredientIds: string[], skip: number) {
    return this.recipeModel
      .find({detailedIngredient: {$in: ingredientIds}})
      .sort({updatedAt: 1})
      .limit(8)
      .skip(skip);
  }

  async findRecipeByKeyword(regex: RegExp, skip): Promise<Recipe[]> {
    return this.recipeModel
      .find({name: {$regex: regex}})
      .sort({updatedAt: 1})
      .limit(8)
      .skip(skip);
  }

  /**
   * @description: 오늘의 추천 레시피 조회
   */
  async todayRandomRecipe() {
    return this.recipeModel
      .aggregate([{$match: {deleted: false}}, {$sample: {size: 8}}])
      .limit(8);
  }

  async updateOneLikes(_id: string, likes: string[]) {
    return this.recipeModel.updateOne({_id}, {$set: {likes}});
  }

  /**
   * @description: 레시피 이미지 업데이트
   * @param _id
   * @param Location
   */
  async recipeImageUpdate(_id: string, Location: string) {
    return this.recipeModel.updateOne(
      {_id},
      {
        $set: {
          profileImage: Location,
        },
      },
    );
  }

  async updateOneRecipe(_id: string, name: string, user: string, desc: string,
                        allIngredient: AllIngredientDto[], steps: StepsDto[],
                        profileImage: string) {
    return this.recipeModel.updateOne(
      {_id},
      {$set: {name, desc, user, updatedAt: new Date(), allIngredient, steps, profileImage}},
    );
  }

  async updateOneRecipeForAdmin(id: string, name: string, desc: string,
                                allIngredient: AllIngredientDto[], steps: StepsDto[],
                                detailedIngredient: string[], profileImage: string ) {
    const {acknowledged} = await this.recipeModel.updateOne(
          {_id: id},
        {$set: { name, desc, allIngredient, steps, detailedIngredient, profileImage, updatedAt: new Date()}});
    return acknowledged;
  }

  async findFavoriteRecipe(
    favoriteRecipeId: string[],
    page,
  ): Promise<Recipe[]> {
    return this.recipeModel
      .find({
        _id: { $in: favoriteRecipeId },
      })
      .skip(page)
      .limit(8);
  }

  async deleteOneRecipe(_id: string) {
    return this.recipeModel.updateOne({_id}, {$set: {deleted: true}})
  }

  async saveRecipe(recipe: Recipe) {
    return new this.recipeModel(recipe).save();
  }
}
