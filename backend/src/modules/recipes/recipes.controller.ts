import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
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
import { RecipesService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';
import { RegisteredUserRecipeDto } from './dto/registered-user-recipe.dto';
import { RegisteredAdminRecipeDto } from './dto/registered-admin-recipe.dto';
import { UpdatedAdminRecipeDto } from './dto/updated-admin-recipe.dto';
import { UpdatedUserRecipeDto } from './dto/updated-user-recipe.dto';
import { UpdatedRecipeLikeDto } from './dto/updated-recipe-like.dto';
import { Response } from 'express';
import { GlobalFilter } from '../../lib/global.filter';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseFilters(new GlobalFilter())
@Controller('recipes')
@ApiTags('레시피 관련 API')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('/all-recipes')
  @ApiOperation({
    summary: '전체 레시피 조회 API',
    description: '전체 레시피를 조회한다!!! 짱짱맨',
  })
  @ApiCreatedResponse({
    description: '전체 레시피 리스트를 생성한다.',
    isArray: true,
    type: RecipeDto,
  })
  @ApiQuery({ name: 'page', type: Number, description: '페이지' })
  private async getAllRecipes(@Query('page') page: number) {
    return this.recipesService.findAll(page);
  }

  @Get('/random-recipes')
  @ApiOperation({
    summary: '랜덤으로 추천 레시피 조회 API',
    description: '추천 레시피를 조회한다.',
  })
  @ApiCreatedResponse({
    description: '랜덤으로 레시피 리스트를 생성한다.',
    isArray: true,
    type: RecipeDto,
  })
  private async getRandomRecipes(): Promise<RecipeDto[]> {
    return this.recipesService.findRandom();
  }

  @Get('/detail/:id')
  @ApiOperation({
    summary: '레시피 id로 레시피 조회 API',
    description: '레시피 id에 해당하는 레시피 조회한다.',
  })
  @ApiCreatedResponse({
    description: '레시피 id에 부합한 레시피 리스트를 생성한다.',
    isArray: true,
    type: RecipeDto,
  })
  @ApiParam({ name: 'id', description: '조회할 레시피 id' })
  private async getRecipeById(@Param('id') id: string): Promise<RecipeDto> {
    return this.recipesService.findRecipeById(id);
  }

  @Get('/ingredient-recipes')
  @ApiOperation({
    summary: '재료 id로 레시피 조회 API',
    description: '필수 재료에 재료 id가 포함된 레시피 조회한다.',
  })
  @ApiCreatedResponse({
    description: '재료 id에 부합한 레시피 리스트를 생성한다.',
    isArray: true,
    type: RecipeDto,
  })
  @ApiQuery({ name: 'id', description: '선택한 재료 id들', type: [String] })
  @ApiQuery({ name: 'page', type: Number, description: '페이지' })
  private async getIngredientRecipes(
    @Query('id') ingredientIds: string[],
    @Query('page') page: number,
  ) {
    return this.recipesService.findRecipesByIngredient(page, ingredientIds);
  }

  @Get('/search')
  @ApiOperation({
    summary: '재료 제목으로 레시피 조회 API',
    description: '제목에 검색어가 포함된 레시피 조회한다.',
  })
  @ApiCreatedResponse({
    description: '검색어에 부합한 레시피 리스트를 생성한다.',
    isArray: true,
    type: RecipeDto,
  })
  @ApiQuery({ name: 'keyword', description: '검색어', type: String })
  @ApiQuery({ name: 'page', type: Number, description: '페이지' })
  private async getRecipeByKeyword(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
  ) {
    return await this.recipesService.findRecipeByKeyword(0, keyword);
  }

  @Post('/register-recipe')
  @ApiOperation({
    summary: '회원 전용 레시피 등록 API',
    description: '회원이 레시피 등록한다.',
  })
  @ApiCreatedResponse({
    description:
      '레시피 등록 후 성공 여부 boolean을 반환한다. 성공: true 실패: false 레시피 modified는 false  디폴트',
    type: Boolean,
  })
  @ApiBody({
    type: RegisteredUserRecipeDto,
    description: '등록할 회원 레시피 정보',
  })
  private async registeredRecipe(
    @Body() recipe: RegisteredUserRecipeDto,
  ): Promise<boolean> {
    return this.recipesService.setRecipe(recipe);
  }

  @Post('/register-recipe/image-upload/:_id')
  @UseInterceptors(FilesInterceptor('file'))
  @ApiOperation({
    summary: '레시피 이미지 업로드 API',
    description: 'S3에 이미지를 업로드',
  })
  async recipeImageUpload(
    @Req() req,
    @Param('_id') _id: string,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    const fileUploadDto = {
      _id,
      file,
    };
    await this.recipesService.imageUpload(fileUploadDto);
  }

  @Post('/register-admin-recipe')
  @ApiOperation({
    summary: '관리자 전용 레시피 등록 API',
    description: '관리자가 레시피 등록한다.',
  })
  @ApiCreatedResponse({
    description:
      '레시피 등록 후 성공 여부 boolean을 반환한다. 성공: true 실패: false 레시피 modified는 true 디폴트, user는 admin 디폴트',
    type: Boolean,
  })
  @ApiBody({
    type: RegisteredAdminRecipeDto,
    description: '등록할 레시피 정보',
  })
  private async registeredAdminRecipe(
    @Body() recipe: RegisteredAdminRecipeDto,
  ): Promise<boolean> {
    return this.recipesService.setAdminRecipe(recipe);
  }

  @Put('/update-admin-recipe')
  @ApiOperation({
    summary: '관리자 전용 레시피 수정 API',
    description: '관리자 레시피 수정한다.',
  })
  @ApiCreatedResponse({
    description:
      '레시피 수정 후 성공 여부 boolean을 반환한다. 성공: true 실패: false',
    type: Boolean,
  })
  @ApiBody({
    type: UpdatedAdminRecipeDto,
    description: '수정할 관리자 레시피 정보',
  })
  private async updateAdminRecipe(
    @Body() recipe: UpdatedAdminRecipeDto,
  ): Promise<boolean> {
    return this.recipesService.updateAdminRecipe(recipe);
  }

  @Put('/update-recipe')
  @ApiOperation({
    summary: '회원 전용 레시피 수정 API',
    description: '회원 레시피 수정한다.',
  })
  @ApiCreatedResponse({
    description:
      '레시피 수정 후 성공 여부 boolean을 반환한다. 성공: true 실패: false',
    type: Boolean,
  })
  @ApiBody({
    type: UpdatedUserRecipeDto,
    description: '수정할 회원 레시피 정보',
  })
  private async updateRecipe(
    @Body() recipe: UpdatedUserRecipeDto,
  ): Promise<boolean> {
    return this.recipesService.updateRecipe(recipe);
  }

  @Patch('/update-like')
  @ApiOperation({
    summary: '회원의 즐겨찾기에 레시피 추가, 제거 API',
    description:
      '회원의 즐겨찾기에 레시피를 추가 및 제거한다.(등록 -> 미등록, 미등록 -> 등록)',
  })
  @ApiCreatedResponse({
    description:
      '회원의 즐겨찾기에 레시피 추가 후 해당 레시피가 줄겨찾기에 등록된 수(좋아요 수)를 반환한다.',
    type: Number,
  })
  @ApiBody({
    type: UpdatedRecipeLikeDto,
    description: '추가할 레시피 아이디와 추가하려는 회원 아이디',
  })
  private async updateLike(
    @Body() recipe: UpdatedRecipeLikeDto,
  ): Promise<string[]> {
    return this.recipesService.updateLike(recipe);
  }

  @Delete('/delete-recipe/:id')
  @ApiOperation({
    summary: '레시피 삭제 API',
    description: '레시피 삭제한다.',
  })
  @ApiCreatedResponse({
    description:
      '레시피 삭제 후 삭제 여부 boolean을 반환한다. 삭제: true 개시: false',
    type: Boolean,
  })
  @ApiParam({ name: 'id', description: '조회할 레시피 id', type: String })
  private async deleteRecipe(@Param('id') id: String): Promise<boolean> {
    return this.recipesService.deleteRecipe(id);
  }
}
