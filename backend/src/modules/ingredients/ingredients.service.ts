import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Ingredient, IngredientDocument} from "../../models/ingredient.model";
import {Model} from "mongoose";
import {v4 as uuidv4} from 'uuid';
import {IngredientDto} from "../../dtos/ingredient.dto";
import {RegisteredIngredientDto} from "../../dtos/registered-ingredient.dto";

@Injectable()
export class IngredientsService {
    constructor(
        @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>
    ){}

    //재료 등록
    async setIngredient(ingredientDto: RegisteredIngredientDto): Promise<boolean> {
        const { name, detailedIngredient } = ingredientDto
        const ingredients = detailedIngredient.map( ({name, img}) => {
            return {
                _id: uuidv4(),
                name,
                img: img ? img : '',
            }
        })
        const ingredient = {
            _id: uuidv4(),
            name,
            detailedIngredient: ingredients,
        }
        const registeredIngredient = new this.ingredientModel(ingredient).save()
        if (registeredIngredient) return true
        return false
    }

    //모든 재료 반환
    async findAllIngredient(): Promise<IngredientDto[]>{
       return this.ingredientModel.find()
    }

    //재료 배열로 한번에 업로드 테스트용
    async setIngredients(ingredientDtoArr: RegisteredIngredientDto[]) {
        ingredientDtoArr.forEach( dto => {
            const { name, detailedIngredient } = dto
            const ingredients = detailedIngredient.map( ({name, img}) => {
                return {
                    _id: uuidv4(),
                    name,
                    img: img ? img : '',
                }
            })
            const ingredient = {
                _id: uuidv4(),
                name,
                detailedIngredient: ingredients,
            }
            const registeredIngredient = new this.ingredientModel(ingredient).save()
            if (!registeredIngredient) return false
        })
        return true
    }
}
