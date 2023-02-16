import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({collection: 'recipes', versionKey: false})
export class Recipe {
    @Prop({ type: String, required: true })
    id: string

    @Prop({ type: Date, required: true })
    createdAt: Date

    @Prop({ type: Date, required: true })
    updatedAt: Date

    @Prop({ type: String, required: true })
    user: string

    @Prop({ type: Array, required: true })
    steps: [
        {
            step: number,
            desc: string,
            img?: URL,
        }
    ]

    @Prop( { type: Boolean, required: true})
    modified: boolean

    @Prop( { type: Array, required: false})
    ingredients: string[]
}

// interface RecipeInterface {
//     id: string,
//     createdAt: Date,
//     updatedAt: Date,
//     userId: string,
//     steps: [
//         {
//             step: number,
//             desc: string,
//             img?: URL,
//         }
//     ]
//     ingredients?: string[],
//     modified: boolean,
// }
//
// interface Ingredient {
//     id: string,
//     name: string,
//     img?: URL,
// }
//
// interface User {
//     id: string,
//     name: string,
//     createdAt: Date,
//     updatedAt: Date,
//     favoriteRecipe: string[],
//     MyRecipe: string[],
//     img?: URL,
// }

export type RecipeDocument = HydratedDocument<Recipe>
export const RecipeSchema = SchemaFactory.createForClass(Recipe)