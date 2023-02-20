import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {ApiBody, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";
import {RecipesService} from "./recipes.service";
import {RecipeDto} from "../../dtos/recipe.dto";
import {RegisteredUserRecipeDto} from "../../dtos/registered-user-recipe.dto";
import {RegisteredAdminRecipeDto} from "../../dtos/registered-admin-recipe.dto";

@Controller('recipes')
@ApiTags('레시피 관련 API')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Get('/all-recipes')
    @ApiOperation({
        summary: '전체 레시피 조회 API',
        description: '전체 레시피를 조회한다.'
    })
    @ApiCreatedResponse({
        description: '전체 레시피 리스트를 생성한다.',
        isArray: true, type: RecipeDto
    })
    private async getAllRecipes(): Promise<RecipeDto[]> {
        return this.recipesService.findAllRecipes()
    }

    @Get('/ingredient-recipes')
    @ApiOperation({
        summary: '재료 id로 레시피 조회 API',
        description: '필수 재료에 재료 id가 포함된 레시피 조회한다.'
    })
    @ApiCreatedResponse({
        description: '재료 id에 부합한 레시피 리스트를 생성한다.',
        isArray: true , type: RecipeDto
    })
    @ApiQuery({name: 'id', description: '선택한 재료 id들'})
    private async getIngredientRecipes(@Query("id") ingredientIds: string[]): Promise<RecipeDto[]> {
        return this.recipesService.findRecipesByIngredient(ingredientIds)
    }

    @Post('/register-recipe')
    @ApiOperation({
        summary: '회원 전용 레시피 등록 API',
        description: '회원이 레시피 등록한다.'
    })
    @ApiCreatedResponse({
        description: '레시피 등록 후 성공 여부 boolean을 반환한다. 성공: true 실패: false 레시피 modified는 false  디폴트',
        type: Boolean
    })
    @ApiBody({
        type: RegisteredUserRecipeDto,
        description: '등록할 회원 레시피 정보'
    })
    private async registeredRecipe(@Body() recipe: RegisteredUserRecipeDto): Promise<Boolean> {
        return this.recipesService.setRecipe(recipe)
    }

    @Post('/register-admin-recipe')
    @ApiOperation({
        summary: '관리자 전용 레시피 등록 API',
        description: '관리자가 레시피 등록한다.'
    })
    @ApiCreatedResponse({
        description: '레시피 등록 후 성공 여부 boolean을 반환한다. 성공: true 실패: false 레시피 modified는 true 디폴트, user는 admin 디폴트',
        type: Boolean
    })
    @ApiBody({type: RegisteredAdminRecipeDto, description: '등록할 레시피 정보'})
    private async registeredAdminRecipe(@Body() recipe: RegisteredAdminRecipeDto): Promise<Boolean> {
        return this.recipesService.setAdminRecipe(recipe)
    }
}
