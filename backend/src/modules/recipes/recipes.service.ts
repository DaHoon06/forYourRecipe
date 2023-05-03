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
import {RecipeUserDto} from "@modules/users/dto/recipe-user.dto";
import {IngredientCategory} from "@src/enums/ingredientCategory";
import {AllIngredientDto} from "@modules/ingredients/dto/all-ingredient.dto";

@UseFilters(new GlobalFilter())
@Injectable()
export class RecipesService {
  constructor(
    private readonly ingredientsService: IngredientsService,
    private readonly userService: UsersService,
    private readonly s3Service: S3Service,
    private readonly recipeRepository: RecipeRepository,
  ) {}

  //전체 레시피 반환
  async findAll(page: number): Promise<RecipeDto[]> {
    if (!page || isNaN(page)) page = 1;
    const foundRecipes = await this.recipeRepository.findAllRecipe(this.currentPage(page));
    return this.getRecipeDtoArr(foundRecipes);
  }

  //랜덤(추천) 레시피 반환
  async findRandom(): Promise<RecipeDto[]> {
    const recipe = await this.recipeRepository.todayRandomRecipe();
    return this.getRecipeDtoArr(recipe);
  }

  //해당 id 레시피 반환
  async findRecipeById(id: string): Promise<RecipeDto> {
    const foundRecipe = await this.recipeRepository.findOneRecipeById(id);
    return this.getRecipeDto(foundRecipe);
  }

  //재료로 레시피 찾기
  async findRecipesByIngredient(page: number, ingredientIds: string[]): Promise<RecipeDto[]> {
    if (!page || isNaN(page)) page = 1;
    const skip = this.currentPage(page);
    const recipes = await this.recipeRepository.findRecipesByIngredient(ingredientIds, skip);
    return this.getRecipeDtoArr(recipes);
  }

  //제목으로 레시피 찾기
  async findRecipeByKeyword(page: number, keyword: string): Promise<RecipeDto[]> {
    if (!page || isNaN(page)) page = 1;
    const regex = new RegExp(`.*${keyword}.*`);
    const skip = this.currentPage(page);
    const recipes = await this.recipeRepository.findRecipeByKeyword(regex, skip);
    return this.getRecipeDtoArr(recipes);
  }

  //회원 레시피 등록
  async setRecipe(name: string, steps: StepsDto[],
                  user: string, profileImage: string, desc: string,
                  allIngredient: AllIngredientDto[]): Promise<string> {
    const recipe = new Recipe(
      Role.USER,
      this.getSteps(steps),
      name,
      desc,
      profileImage,
      allIngredient,
      user,
    );
    const { _id } = await this.recipeRepository.saveRecipe(recipe)
    return _id;
  }

  /**
   * @description 레시피 이미지 업로드
   * @param fileUploadDto
   */
  async imageUpload(fileUploadDto: any): Promise<void> {
    const { _id } = fileUploadDto;
    const Location = await this.s3Service.s3Upload(fileUploadDto);
    await this.recipeRepository.recipeImageUpdate(_id, Location);
  }

  //회원 레시피 수정
  async updateRecipe(recipe: UpdatedUserRecipeDto): Promise<boolean> {
    return this.recipeRepository.updateOneRecipe(recipe);
  }

  //관리자 레시피 등록
  async setAdminRecipe(recipeDto: RegisteredAdminRecipeDto): Promise<boolean> {
    const { name, steps, desc, profileImage, allIngredient, detailedIngredient } = recipeDto;

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

    const data = await this.recipeRepository.saveRecipe(recipe);
    return !!data;
  }

  //관리자 레시피 수정
  async updateAdminRecipe(recipe: UpdatedAdminRecipeDto): Promise<boolean> {
    const { id, name, desc, allIngredient, steps, detailedIngredient, profileImage } = recipe;
    return this.recipeRepository.updateOneRecipeForAdmin(id, name, desc, allIngredient, steps, detailedIngredient, profileImage);
  }

  //회원 즐겨찾는 레시피에 추가
  async updateLike(recipe: UpdatedRecipeLikeDto): Promise<string[]> {
    const { id, user } = recipe;
    const { likes } = await this.recipeRepository.findOneRecipeById(id);
    const index = likes.indexOf(user);
    if (index > -1) {
      likes.splice(index, 1);
    } else {
      likes.push(user);
    }
    await this.recipeRepository.updateOneLikes(id, likes);
    return this.userService.setFavoriteRecipes(id, user);
  }

  //레시피 삭제
  async deleteRecipe(id: string): Promise<boolean> {
    return !!(await this.recipeRepository.deleteOneRecipe(id));
  }

  private getSteps(steps: StepsDto[]): StepsDto[] {
    return steps.map(({ step, desc, img }) => { return { step, desc, img: img ? img : '' }})
  }

  /**
   * @description: 즐겨찾기한 레시피 조회
   * @private
   */
  async getFavoriteRecipe(uid: string, page: number): Promise<RecipeDto[]> {
    if (!page || isNaN(page)) page = 1;
    const user = await this.userService.findById(uid);
    const { favoriteRecipes } = user;
    const favoritesRecipe = await this.recipeRepository.findFavoriteRecipe(
      favoriteRecipes,
      this.currentPage(page),
    );
    return this.getRecipeDtoArr(favoritesRecipe);
  }

  private async getRecipeDto(recipe: Recipe): Promise<RecipeDto> {
    const detailedIngredient = await this.ingredientsService.findIngredientById(recipe.detailedIngredient)
    const getUser = async () => {
      if (recipe.user === Role.ADMIN) {
        return { name: Role.ADMIN }
      } else {
        const { _id, img, name, introduce } = await this.userService.findById(recipe.user)
        return { _id, img, name, introduce }
      }
    }
    return new RecipeDto(
      recipe._id,
      recipe.name,
      recipe.createdAt,
      recipe.updatedAt,
      await getUser(),
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
    return Promise.all(recipes.map(async (recipe) => this.getRecipeDto(recipe)))
  }

  private currentPage(page: number): number {
    return (page - 1) * 8
  }
}
