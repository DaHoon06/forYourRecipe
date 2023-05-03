import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Ingredient, IngredientDocument} from "@modules/ingredients/entities/ingredient.entity";
import {Model} from "mongoose";

@Injectable()
export class IngredientsRepository {
    constructor(@InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>) {}

    public async save(ingredient: Ingredient) {
        return new this.ingredientModel(ingredient).save();
    }

    public async findAll() {
        return this.ingredientModel.find();
    }

    public async findIngredientById(id: string[]) {
        return this.ingredientModel.find({ detailedIngredient: { $elemMatch: { _id: { $in: id } } }});
    }
}


