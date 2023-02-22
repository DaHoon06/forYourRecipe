import {IngredientCategory} from "../enums/ingredientCategory";

export interface AllIngredient {
    category: IngredientCategory,
    ingredients: {
        name: string,
        unit?: string
    }[]
}