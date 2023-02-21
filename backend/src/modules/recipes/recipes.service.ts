import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Recipe, RecipeDocument} from "../../models/recipe.model";
import {RegisteredUserRecipeDto} from "../../dtos/recipe/registered-user-recipe.dto";
import {RegisteredAdminRecipeDto} from "../../dtos/recipe/registered-admin-recipe.dto";
import {IngredientsService} from "../ingredients/ingredients.service";
import {RecipeDto} from "../../dtos/recipe/recipe.dto";
import {Role} from "../../enums/Role";
import {StepsDto} from "../../dtos/recipe/steps.dto";

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
        private readonly ingredientsService: IngredientsService
    ) {
    }

    //전체 레시피 반환
    async findAllRecipes() {
        const foundRecipe = await this.recipeModel.find()
        return Promise.all(
            foundRecipe.map(async (recipe) => {
                return this.getRecipeDto(recipe)
            })
        )
    }

    //해당 id 레시피 반환
    async findRecipeById(id: string) {
        const foundRecipe = await this.recipeModel.findById(id)
        return this.getRecipeDto(foundRecipe)
    }

    //재료로 레시피 찾기
    async findRecipesByIngredient(ingredientIds: string[]) {
        const foundRecipe = await this.recipeModel.find({detailedIngredient: {$in: ingredientIds}})
        return Promise.all(
            foundRecipe.map(async (recipe) => {
                return this.getRecipeDto(recipe)
            })
        )
    }

    //회원 레시피 등록
    async setRecipe(recipeDto: RegisteredUserRecipeDto) {
        const {name, steps, user, profileImage, desc, allIngredient} = recipeDto
        const recipe = new Recipe(Role.USER, this.getSteps(steps), name, desc, profileImage, allIngredient, user)
        const registeredRecipe = await new this.recipeModel(recipe).save()
        if (registeredRecipe) return true
        return false
    }

    //관리자 레시피 등록
    async setAdminRecipe(recipeDto: RegisteredAdminRecipeDto) {
        const {name, steps, desc, profileImage, allIngredient, detailedIngredient} = recipeDto
        const recipe = new Recipe(Role.ADMIN, this.getSteps(steps), name, desc, profileImage, allIngredient, Role.ADMIN, detailedIngredient)
        const data = await new this.recipeModel(recipe).save()
        if (data) {
            return true
        }
        return false
    }

    private getSteps(steps: StepsDto[]) {
        return steps.map(({step, desc, img}) => {
            return {
                step, desc,
                img: img ? img : ''
            }
        })
    }

    private async getRecipeDto(recipe: Recipe) {
        const detailedIngredient = await this.ingredientsService.findIngredientById(recipe.detailedIngredient)
        return new RecipeDto(
            recipe._id, recipe.name,
            recipe.createdAt, recipe.updatedAt,
            recipe.user, recipe.modified,
            recipe.likes, recipe.steps,
            recipe.allIngredient, recipe.desc,
            detailedIngredient,
            recipe.profileImage
        )
    }
}


