import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Recipe, RecipeDocument} from "../../models/recipe.model";
import {RegisteredUserRecipeDto} from "../../dtos/recipe/registered-user-recipe.dto";
import {RegisteredAdminRecipeDto} from "../../dtos/recipe/registered-admin-recipe.dto";
import {IngredientsService} from "../ingredients/ingredients.service";
import {RecipeDto} from "../../dtos/recipe/recipe.dto";
import {Role} from "../../enums/role";
import {StepsDto} from "../../dtos/recipe/steps.dto";
import {UpdatedAdminRecipeDto} from "../../dtos/recipe/updated-admin-recipe.dto";
import {DeletedRecipeDto} from "../../dtos/recipe/deleted-recipe.dto";
import {UpdatedUserRecipeDto} from "../../dtos/recipe/updated-user-recipe.dto";
import {UpdatedRecipeLikeDto} from "../../dtos/recipe/updated-recipe-like.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
        private readonly ingredientsService: IngredientsService,
        private readonly userService: UsersService
    ) {
    }

    //전체 레시피 반환
    async findAll(page: number): Promise<RecipeDto[]> {
        const currentPage = (page - 1) * 8
        const foundRecipes = await this.recipeModel.find().sort({updatedAt: 1}).limit(8).skip(currentPage)
        foundRecipes.forEach(recipe => console.log(recipe.name))
        return this.getRecipeDtoArr(foundRecipes)
    }

    //랜덤(추천) 레시피 반환
    async findRandom(): Promise<RecipeDto[]> {
        const recipe = await this.recipeModel.aggregate([{$sample: {size: 6}}])
        return this.getRecipeDtoArr(recipe)
    }

    //해당 id 레시피 반환
    async findRecipeById(id: string): Promise<RecipeDto> {
        const foundRecipe = await this.recipeModel.findById(id)
        return this.getRecipeDto(foundRecipe)
    }

    //재료로 레시피 찾기
    async findRecipesByIngredient(ingredientIds: string[]): Promise<RecipeDto[]> {
        const foundRecipes = await this.recipeModel.find({detailedIngredient: {$in: ingredientIds}})
        return this.getRecipeDtoArr(foundRecipes)
    }

    //제목으로 레시피 찾기
    async findRecipeByKeyword(keyword: string): Promise<RecipeDto[]> {
        const regex = new RegExp(`.*${keyword}.*`)
        const foundRecipes = await this.recipeModel.find({name: {$regex: regex}})
        return this.getRecipeDtoArr(foundRecipes)
    }

    //회원 레시피 등록
    async setRecipe(recipeDto: RegisteredUserRecipeDto): Promise<boolean> {
        const {name, steps, user, profileImage, desc, allIngredient} = recipeDto
        const recipe = new Recipe(Role.USER, this.getSteps(steps), name, desc, profileImage, allIngredient, user)
        const registeredRecipe = await new this.recipeModel(recipe).save()
        if (registeredRecipe) return true
        return false
    }
    
    //회원 레시피 수정
    async updateRecipe(recipe: UpdatedUserRecipeDto): Promise<boolean> {
        const { id, name, user, desc, allIngredient, steps, profileImage } = recipe
        const { acknowledged } = await this.recipeModel.updateOne({ _id: id }, { $set: {
                name: name,
                desc: desc,
                user: user,
                updatedAt: new Date(),
                allIngredient: allIngredient,
                steps: steps,
                profileImage: profileImage
            }})
        return acknowledged
    }

    //관리자 레시피 등록
    async setAdminRecipe(recipeDto: RegisteredAdminRecipeDto): Promise<boolean> {
        const {name, steps, desc, profileImage, allIngredient, detailedIngredient} = recipeDto
        const recipe = new Recipe(Role.ADMIN, this.getSteps(steps), name, desc, profileImage, allIngredient, Role.ADMIN, detailedIngredient)
        const data = await new this.recipeModel(recipe).save()
        if (data) {
            return true
        }
        return false
    }

    //관리자 레시피 수정
    async updateAdminRecipe(recipe: UpdatedAdminRecipeDto): Promise<boolean> {
        const { id, name, desc, allIngredient, steps, detailedIngredient, profileImage } = recipe
        const { acknowledged } = await this.recipeModel.updateOne({ _id: id }, { $set: {
                name: name,
                desc: desc,
                updatedAt: new Date(),
                allIngredient: allIngredient,
                steps: steps,
                detailedIngredient: detailedIngredient,
                profileImage: profileImage
            }})
        return acknowledged
    }
    
    //회원 즐겨찾는 레시피에 추가
    async updateLike(recipe: UpdatedRecipeLikeDto): Promise<number> {
        const { id, user } = recipe
        const { likes } = await this.recipeModel.findById(id)

        const index = likes.indexOf(user)
        if (index > -1) {
            likes.splice(index, 1)
        } else {
            likes.push(user)
        }
        await this.recipeModel.updateOne({_id: id}, { $set: {likes: likes}})
        await this.userService.setFavoriteRecipes(id, user)
        return likes.length
    }

    //레시피 삭제
    async deleteRecipe(recipe: DeletedRecipeDto): Promise<boolean> {
        const { id, deleted } = recipe
        const { acknowledged } = await this.recipeModel.updateOne({ _id: id }, { $set: { deleted: deleted }})
        return acknowledged
    }

    private getSteps(steps: StepsDto[]): StepsDto[] {
        return steps.map(({step, desc, img}) => {
            return {
                step, desc,
                img: img ? img : ''
            }
        })
    }

    private async getRecipeDto(recipe: Recipe): Promise<RecipeDto> {
        const detailedIngredient = await this.ingredientsService.findIngredientById(recipe.detailedIngredient)
        return new RecipeDto(
            recipe._id, recipe.name,
            recipe.createdAt, recipe.updatedAt,
            recipe.user, recipe.modified,
            recipe.likes, recipe.steps,
            recipe.allIngredient, recipe.desc,
            recipe.deleted,
            detailedIngredient,
            recipe.profileImage
        )
    }

    private async getRecipeDtoArr(recipes: Recipe[]): Promise<RecipeDto[]> {
        return Promise.all(
            recipes.map(async (recipe) => {
                return this.getRecipeDto(recipe)
            })
        )
    }
}


