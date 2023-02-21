import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {IngredientCategory} from "../enums/IngredientCategory";
import {v4 as uuidv4} from 'uuid';
import {Role} from "../enums/Role";

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
            img:  {type: String, required: false}
        }],
        required: true
    })
    steps: { step: number, desc: string, img?: string }[]

    //재료 검색 가능한지 레시피인지 체크
    @Prop( { type: Boolean, required: true })
    modified: boolean

    @Prop({
        type: [{
            category: {type: String, required: true},
            ingredients: {
                type: [{
                    name: {type: String, required: true},
                    unit: {type: String, required: false}
                }]
            }
        }],
        required: true
    })
    allIngredient: {
        category: IngredientCategory,
        ingredients: {name: string, unit?: string}[]
    }[]

    @Prop({type: String, required: false })
    profileImage?: string

    @Prop({type: [String], required: false})
    detailedIngredient?: string[]

    constructor(
                roll: Role,
                steps: {step, desc, img}[],
                name: string, desc: string,
                profileImage: string,
                allIngredient: {
                    category: IngredientCategory,
                    ingredients: {name: string, unit?: string}[]
                }[],
                user: string,
                detailedIngredient?: string[],
                ) {
        this._id = uuidv4()
        this.likes = 0
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.steps = steps
        this.allIngredient = allIngredient
        this.name = name
        this.profileImage = profileImage ? profileImage : ''
        this.desc = desc

        switch (roll) {
            case Role.ADMIN: {
                this.modified = true
                this.user = user
                this.detailedIngredient = detailedIngredient
                break
            }
            case Role.USER: {
                this.modified = false
                this.user = user
                this.detailedIngredient = []
                break
            }
        }
    }
}

export type RecipeDocument = HydratedDocument<Recipe>
export const RecipeSchema = SchemaFactory.createForClass(Recipe)