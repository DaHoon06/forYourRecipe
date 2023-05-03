import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RecipesService } from '@modules/recipes/recipes.service';
import { RecipeDto } from '@modules/recipes/dto/recipe.dto';
import { RegisteredUserRecipeDto } from '@modules/recipes/dto/registered-user-recipe.dto';
import { RegisteredAdminRecipeDto } from '@modules/recipes/dto/registered-admin-recipe.dto';
import { UpdatedAdminRecipeDto } from '@modules/recipes/dto/updated-admin-recipe.dto';
import { UpdatedUserRecipeDto } from '@modules/recipes/dto/updated-user-recipe.dto';
import { UpdatedRecipeLikeDto } from '@modules/recipes/dto/updated-recipe-like.dto';
import { GlobalFilter } from '@src/lib/global.filter';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseFilters(new GlobalFilter())
@Controller('recipes')
@ApiTags('레시피 관련 API')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('/all-recipes')
  @ApiOperation({summary: '전체 레시피 조회 API'})
  @ApiCreatedResponse({ type: [RecipeDto] })
  @ApiQuery({ name: 'page', type: Number })
  private async getAllRecipes(@Query('page') page: number) {
    return this.recipesService.findAll(page);
  }

  @Get('/random-recipes')
  @ApiOperation({summary: '랜덤으로 추천 레시피 조회 API'})
  @ApiCreatedResponse({ type: [RecipeDto] })
  private async getRandomRecipes(): Promise<RecipeDto[]> {
    return this.recipesService.findRandom();
  }

  @Get('/detail/:id')
  @ApiOperation({summary: '레시피 id로 레시피 조회 API'})
  @ApiCreatedResponse({
    description: '레시피 id에 부합한 레시피 리스트를 생성한다. * admin 등록 레시피 경우 user: { name : "admin" } 으로 리턴 ',
    type: [RecipeDto]
  })
  @ApiParam({ name: 'id', description: '조회할 레시피 id' })
  private async getRecipeById(@Param('id') id: string): Promise<RecipeDto> {
    return this.recipesService.findRecipeById(id);
  }

  @Get('/ingredient-recipes')
  @ApiOperation({summary: '재료 id로 레시피 조회 API'})
  @ApiCreatedResponse({ type: [RecipeDto] })
  @ApiQuery({ name: 'id', description: '선택한 재료 id들', type: [String] })
  @ApiQuery({ name: 'page', type: Number })
  private async getIngredientRecipes( @Query('id') ingredientIds: string[], @Query('page') page: number ) {
    return this.recipesService.findRecipesByIngredient(page, ingredientIds);
  }

  @Get('/search')
  @ApiOperation({summary: '재료 제목으로 레시피 조회 API'})
  @ApiCreatedResponse({ type: [RecipeDto] })
  @ApiQuery({ name: 'keyword', description: '검색어', type: String })
  @ApiQuery({ name: 'page', type: Number })
  private async getRecipeByKeyword( @Query('keyword') keyword: string,@Query('page') page: number) {
    return await this.recipesService.findRecipeByKeyword(0, keyword);
  }

  @Post('/register-recipe')
  @ApiOperation({summary: '회원 전용 레시피 등록 API'})
  @ApiCreatedResponse({ type: Boolean })
  @ApiBody({type: RegisteredUserRecipeDto})
  private async registeredRecipe(@Body() recipeDto: RegisteredUserRecipeDto): Promise<string> {
    const { name, steps, user, profileImage, desc, allIngredient } = recipeDto;
    return this.recipesService.setRecipe(name, steps, user, profileImage, desc, allIngredient);
  }

  @Post('/register-recipe/image-upload/:_id')
  @UseInterceptors(FilesInterceptor('file'))
  @ApiOperation({summary: '레시피 이미지 업로드 API'})
  async recipeImageUpload( @Req() req, @Param('_id') _id: string, @UploadedFiles() file: Array<Express.Multer.File> ): Promise<void> {
    const fileUploadDto = { _id, file };
    await this.recipesService.imageUpload(fileUploadDto);
  }

  @Post('/register-admin-recipe')
  @ApiOperation({ summary: '관리자 전용 레시피 등록 API' })
  @ApiCreatedResponse({
    description: '레시피 등록 후 성공 여부 boolean을 반환한다. 성공: true 실패: false 레시피 modified는 true 디폴트, user는 admin 디폴트',
    type: Boolean,
  })
  @ApiBody({ type: RegisteredAdminRecipeDto })
  private async registeredAdminRecipe(@Body() recipe: RegisteredAdminRecipeDto): Promise<boolean> {
    const { name, steps, desc, profileImage, allIngredient, detailedIngredient } = recipe;
    return this.recipesService.setAdminRecipe(name, steps, desc, profileImage, allIngredient, detailedIngredient);
  }

  @Put('/update-admin-recipe')
  @ApiOperation({ summary: '관리자 전용 레시피 수정 API'})
  @ApiCreatedResponse({ type: Boolean })
  @ApiBody({ type: UpdatedAdminRecipeDto })
  private async updateAdminRecipe(@Body() recipe: UpdatedAdminRecipeDto): Promise<boolean> {
    const { id, name, desc, allIngredient, steps, detailedIngredient, profileImage } = recipe;
    return this.recipesService.updateAdminRecipe(id, name, desc, allIngredient, steps, detailedIngredient, profileImage);
  }

  @Put('/update-recipe')
  @ApiOperation({ summary: '회원 전용 레시피 수정 API' })
  @ApiCreatedResponse({ type: Boolean })
  @ApiBody({ type: UpdatedUserRecipeDto })
  private async updateRecipe(@Body() recipe: UpdatedUserRecipeDto): Promise<boolean> {
    const {id, name, user, desc, allIngredient, steps, profileImage} = recipe;
    return this.recipesService.updateRecipe(id, name, user, desc, allIngredient, steps, profileImage);
  }

  @Patch('/update-like')
  @ApiOperation({ summary: '회원의 즐겨찾기에 레시피 추가, 제거 API', description: '(등록 -> 미등록, 미등록 -> 등록)' })
  @ApiCreatedResponse({type: Number})
  @ApiBody({type: UpdatedRecipeLikeDto})
  private async updateLike(@Body() recipe: UpdatedRecipeLikeDto): Promise<string[]> {
    const { id, user } = recipe;
    return this.recipesService.updateLike(id, user);
  }

  @Delete('/delete-recipe/:id')
  @ApiOperation({ summary: '레시피 삭제 API'})
  @ApiCreatedResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: '조회할 레시피 id', type: String })
  private async deleteRecipe(@Param('id') id: string): Promise<boolean> {
    return this.recipesService.deleteRecipe(id);
  }
}
