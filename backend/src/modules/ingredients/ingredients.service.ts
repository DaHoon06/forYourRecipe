import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Ingredient, IngredientDocument} from "../../models/ingredient.model";
import {Model} from "mongoose";
import {v4 as uuidv4} from 'uuid';
import {IngredientDto} from "../../dtos/ingredient.dto";

@Injectable()
export class IngredientsService {
    constructor(
        @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>
    ){}

    //재료 등록
    async setIngredient(name: string): Promise<boolean> {
        const ingredient = {
            _id: uuidv4(),
            name
        }
        const registeredIngredient = new this.ingredientModel(ingredient).save()
        if (registeredIngredient) return true
        return false
    }

    //모든 재료 반환
    async findAllIngredient(): Promise<IngredientDto[]>{
       return this.ingredientModel.find()
    }
}
