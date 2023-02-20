import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Recipe, RecipeDocument} from "../../models/recipe.model";
import {RegisteredUserRecipeDto} from "../../dtos/registered-user-recipe.dto";
import {v4 as uuidv4} from 'uuid';
import {RegisteredAdminRecipeDto} from "../../dtos/registered-admin-recipe.dto";
import {IngredientsService} from "../ingredients/ingredients.service";
import {RecipeDto} from "../../dtos/recipe.dto";

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
        private readonly ingredientsService: IngredientsService
    ) {}

    //전체 레시피 반환
    async findAllRecipes() {
        return this.recipeModel.find()
    }

    //해당 id 레시피 반환
    async findRecipeById(id: string) {
        return this.recipeModel.findById(id)
    }

    //재료로 레시피 찾기
    async findRecipesByIngredient(ingredientIds: string[]) {
        const foundRecipe = await this.recipeModel.find({detailedIngredient: {$in: ingredientIds}})
        return Promise.all(
            foundRecipe.map(async (recipe) => {
                    const {detailedIngredient} = recipe
                    const ingredient = await this.ingredientsService.findIngredientById(detailedIngredient)
                    const recipeDto: RecipeDto = {
                        _id: recipe._id,
                        name: recipe.name,
                        createdAt: recipe.createdAt,
                        updatedAt: recipe.updatedAt,
                        user: recipe.user,
                        modified: recipe.modified,
                        steps: recipe.steps,
                        likes: recipe.likes,
                        profileImage: recipe.profileImage,
                        detailedIngredient: ingredient,
                    }
                    return recipeDto
                }
                )
        )
    }

    //회원 레시피 등록
    async setRecipe(recipeDto: RegisteredUserRecipeDto) {
        const { name, steps, user, profileImage, desc, allIngredient} = recipeDto

        const mappedSteps = steps.map( ({step, desc, img}) => {
            return { step, desc, img: img ? img : ''}
        })

        const recipe: Recipe= {
            _id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
            steps: mappedSteps,
            profileImage: profileImage ? profileImage : '',
            modified: false,
            likes: 0,
            desc,
            name,
            user,
            allIngredient,
            detailedIngredient: []
        }
        const registeredRecipe = await new this.recipeModel(recipe).save()
        if (registeredRecipe) return true
        return false
    }

    //관리자 레시피 등록
    async setAdminRecipe(recipeDto: RegisteredAdminRecipeDto) {
        const { name, steps, desc, detailedIngredient, profileImage, allIngredient } = recipeDto

        const mappedSteps = steps.map( ({step, desc, img}) => {
            return {
                step,
                desc,
                img: img ? img : ''
            }
        })

        // const ingredients = detailedIngredient.map( ({_id, name, img}) => {
        //     return {
        //         _id,
        //         name: name,
        //         img: img ? img : ''
        //     }
        // })

        const recipe: Recipe = {
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
            detailedIngredient,
            allIngredient,
        }
        const data = await new this.recipeModel(recipe).save()
        if (data) {return true}
        return  false
    }
}

