import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({collection: 'recipes', versionKey: false})
export class Recipe {
    @Prop({ type: String, required: true })
    _id: string

    @Prop({ type: String, required: true })
    name: string

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
            img?: string,
        }
    ]

    //재료 검색 가능한지 레시피인지 체크
    @Prop( { type: Boolean, required: true})
    modified: boolean

    @Prop({type: String, required: false })
    profileImage?: string

    //필수 재료
    @Prop( { type: Array, required: false})
    ingredients?: string[]
}

export type RecipeDocument = HydratedDocument<Recipe>
export const RecipeSchema = SchemaFactory.createForClass(Recipe)