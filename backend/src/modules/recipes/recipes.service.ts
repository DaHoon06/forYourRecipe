import { Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Recipe,
  RecipeDocument,
} from '@modules/recipes/entities/recipe.entity';
import { RegisteredUserRecipeDto } from '@modules/recipes/dto/registered-user-recipe.dto';
import { RegisteredAdminRecipeDto } from '@modules/recipes/dto/registered-admin-recipe.dto';
import { IngredientsService } from '@modules/ingredients/ingredients.service';
import { RecipeDto } from '@modules/recipes/dto/recipe.dto';
import { Role } from '@src/enums/role';
import { StepsDto } from '@modules/recipes/dto/steps.dto';
import { UpdatedAdminRecipeDto } from '@modules/recipes/dto/updated-admin-recipe.dto';
import { UpdatedUserRecipeDto } from '@modules/recipes/dto/updated-user-recipe.dto';
import { UpdatedRecipeLikeDto } from '@modules/recipes/dto/updated-recipe-like.dto';
import { UsersService } from '@modules/users/users.service';
import { GlobalFilter } from '@src/lib/global.filter';
import { S3Service } from '@src/providers/aws/s3/s3.service';
import { RecipeRepository } from '@modules/recipes/recipe.repository';

@UseFilters(new GlobalFilter())
@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    private readonly ingredientsService: IngredientsService,
    private readonly userService: UsersService,
    private readonly s3Service: S3Service,
    private readonly recipeRepository: RecipeRepository,
  ) {}

  //전체 레시피 반환
  async findAll(page: number): Promise<RecipeDto[]> {
    if (!page || isNaN(page)) page = 1;
    const foundRecipes = await this.recipeRepository.findAllRecipe(
      this.currentPage(page),
    );
    return this.getRecipeDtoArr(foundRecipes);
  }

  //랜덤(추천) 레시피 반환
  async findRandom(): Promise<RecipeDto[]> {
    const recipe = await this.recipeRepository.todayRandomRecipe();
    return this.getRecipeDtoArr(recipe);
  }

  //해당 id 레시피 반환
  async findRecipeById(id: string): Promise<RecipeDto> {
    const foundRecipe = await this.recipeModel.findOne({ _id: id });
    return this.getRecipeDto(foundRecipe);
  }

  //재료로 레시피 찾기
  async findRecipesByIngredient(
    page: number,
    ingredientIds: string[],
  ): Promise<RecipeDto[]> {
    if (!page || isNaN(page)) page = 1;
    const foundRecipes = await this.recipeModel
      .find({ detailedIngredient: { $in: ingredientIds } })
      .sort({ updatedAt: 1 })
      .limit(8)
      .skip(this.currentPage(page));
    return this.getRecipeDtoArr(foundRecipes);
  }

  //제목으로 레시피 찾기
  async findRecipeByKeyword(
    page: number,
    keyword: string,
  ): Promise<RecipeDto[]> {
    if (!page || isNaN(page)) page = 1;
    const regex = new RegExp(`.*${keyword}.*`);
    const foundRecipes = await this.recipeModel
      .find({ name: { $regex: regex } })
      .sort({ updatedAt: 1 })
      .limit(8)
      .skip(this.currentPage(page));
    return this.getRecipeDtoArr(foundRecipes);
  }

  //회원 레시피 등록
  async setRecipe(recipeDto: RegisteredUserRecipeDto): Promise<string> {
    const { name, steps, user, profileImage, desc, allIngredient } = recipeDto;
    const recipe = new Recipe(
      Role.USER,
      this.getSteps(steps),
      name,
      desc,
      profileImage,
      allIngredient,
      user,
    );
    const { _id } = await new this.recipeModel(recipe).save();
    return _id;
  }

  /**
   * @description 레시피 이미지 업로드
   * @param fileUploadDto
   */
  async imageUpload(fileUploadDto: any): Promise<void> {
    const { _id } = fileUploadDto;
    const Location = await this.s3Service.s3Upload(fileUploadDto);
    // S3 업로드 후 본문 이미지 업데이트
    await this.recipeRepository.recipeImageUpdate(_id, Location);
  }

  //회원 레시피 수정
  async updateRecipe(recipe: UpdatedUserRecipeDto): Promise<boolean> {
    return this.recipeRepository.updateOneRecipe(recipe);
  }

  //관리자 레시피 등록
  async setAdminRecipe(recipeDto: RegisteredAdminRecipeDto): Promise<boolean> {
    const {
      name,
      steps,
      desc,
      profileImage,
      allIngredient,
      detailedIngredient,
    } = recipeDto;
    const recipe = new Recipe(
      Role.ADMIN,
      this.getSteps(steps),
      name,
      desc,
      profileImage,
      allIngredient,
      Role.ADMIN,
      detailedIngredient,
    );
    const data = await new this.recipeModel(recipe).save();
    return !!data;
  }

  //관리자 레시피 수정
  async updateAdminRecipe(recipe: UpdatedAdminRecipeDto): Promise<boolean> {
    const {
      id,
      name,
      desc,
      allIngredient,
      steps,
      detailedIngredient,
      profileImage,
    } = recipe;
    const { acknowledged } = await this.recipeModel.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          desc: desc,
          updatedAt: new Date(),
          allIngredient: allIngredient,
          steps: steps,
          detailedIngredient: detailedIngredient,
          profileImage: profileImage,
        },
      },
    );
    return acknowledged;
  }

  //회원 즐겨찾는 레시피에 추가
  async updateLike(recipe: UpdatedRecipeLikeDto): Promise<string[]> {
    const { id, user } = recipe;
    const { likes } = await this.recipeModel.findOne({ _id: id });
    const index = likes.indexOf(user);
    if (index > -1) {
      likes.splice(index, 1);
    } else {
      likes.push(user);
    }
    await this.recipeModel.updateOne({ _id: id }, { $set: { likes } });
    return this.userService.setFavoriteRecipes(id, user);
  }

  //레시피 삭제
  async deleteRecipe(id: String): Promise<boolean> {
    const { deleted } = await this.recipeModel.findById(id);
    await this.recipeModel.updateOne(
      { _id: id },
      { $set: { deleted: !deleted } },
    );
    return !deleted;
  }

  private getSteps(steps: StepsDto[]): StepsDto[] {
    return steps.map(({ step, desc, img }) => {
      return {
        step,
        desc,
        img: img ? img : '',
      };
    });
  }

  private async getRecipeDto(recipe: Recipe): Promise<RecipeDto> {
    const detailedIngredient = await this.ingredientsService.findIngredientById(
      recipe.detailedIngredient,
    );
    return new RecipeDto(
      recipe._id,
      recipe.name,
      recipe.createdAt,
      recipe.updatedAt,
      recipe.user,
      recipe.modified,
      recipe.likes,
      recipe.steps,
      recipe.allIngredient,
      recipe.desc,
      recipe.deleted,
      detailedIngredient,
      recipe.profileImage,
    );
  }

  private async getRecipeDtoArr(recipes: Recipe[]): Promise<RecipeDto[]> {
    return Promise.all(
      recipes.map(async (recipe) => {
        return this.getRecipeDto(recipe);
      }),
    );
  }

  private currentPage(page: number) {
    return (page - 1) * 8;
  }
}
