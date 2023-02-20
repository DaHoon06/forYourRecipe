import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
// import {DetailedIngredient} from "./ingredient.model";

@Schema({collection: 'recipes', versionKey: false, _id: false})
export class Recipe {
    @Prop({ type: String, required: true })
    _id: string

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    desc: string

    @Prop({type: Number, required: false})
    likes: number

    @Prop({ type: Date, required: true })
    createdAt: Date

    @Prop({ type: Date, required: true })
    updatedAt: Date

    @Prop({ type: String, required: true})
    user: string

    @Prop({
        type: [{
            step: {type: Number, required: true},
            desc: {type: String, required: true},
            img: {type: String, required: false},
        }],
        required: true
    })
    steps: { step: number, desc: string, img?: string }[]

    //재료 검색 가능한지 레시피인지 체크
    @Prop( { type: Boolean, required: true })
    modified: boolean

    @Prop({type: String, required: true})
    allIngredient: string

    @Prop({type: String, required: false })
    profileImage?: string

    //필수 재료
    // @Prop({
    //     type: [{
    //         _id: {type: String, required: true},
    //         name: {type: String, required: true},
    //         img: {type: String, required: false},
    //     }],
    //     required: false
    // })
    // detailedIngredient?: DetailedIngredient[]
    @Prop({type: [String], required: false})
    detailedIngredient?: string[]
}

export type RecipeDocument = HydratedDocument<Recipe>
export const RecipeSchema = SchemaFactory.createForClass(Recipe)