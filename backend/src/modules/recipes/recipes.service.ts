import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Recipe, RecipeDocument} from "../../models/recipe.model";
import {RegisteredUserRecipeDto} from "../../dtos/registered-user-recipe.dto";
import {v4 as uuidv4} from 'uuid';
import {RecipeDto} from "../../dtos/recipe.dto";
import {RegisteredAdminRecipeDto} from "../../dtos/registered-admin-recipe.dto";

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>
    ) {}

    //전체 레시피 반환
    async findAllRecipes(): Promise<RecipeDto[]> {
        return this.recipeModel.find()
    }

    //재료로 레시피 찾기
    async findRecipesByIngredient(ingredientIds: string[]): Promise<RecipeDto[]> {
        return this.recipeModel.find({ingredients: ingredientIds})
    }

    //회원 레시피 등록
    async setRecipe(recipeDto: RegisteredUserRecipeDto): Promise<boolean> {
        const { name, steps, user, profileImage, desc } = recipeDto
        const mappedSteps = steps.map( ({step, desc, img}) => {
            return { step, desc, img: img ? img : ''}
        })
        const recipe = {
            _id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
            steps: mappedSteps,
            profileImage: profileImage ? profileImage : '',
            ingredients: [],
            modified: false,
            desc,
            name,
            user,
        }
        const registeredRecipe = await new this.recipeModel(recipe).save()
        if (registeredRecipe) return true
        return false
    }

    //관리자 레시피 등록
    async setAdminRecipe(recipeDto: RegisteredAdminRecipeDto): Promise<boolean> {
        const { name, steps, desc, detailedIngredient, profileImage } = recipeDto

        const mappedSteps = steps.map( ({step, desc, img}) => {
            return {
                step,
                desc,
                img: img ? img : ''
            }
        })

        const ingredients = detailedIngredient.map( ({_id, name, img}) => {
            return {
                _id,
                name: name,
                img: img ? img : ''
            }
        })
        const recipe = {
            _id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
            user: 'admin',
            modified: true,
            likes: 0,
            steps: mappedSteps,
            profileImage: profileImage ? profileImage : '',
            name,
            desc,
            ingredients,
        }
        const data = await new this.recipeModel(recipe).save()
        if (data) {return true}
        return  false
    }
}

