import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export class DetailedIngredient {
    @Prop({type: String, required: true})
    _id: string
    @Prop({type: String, required: true})
    name: string
    @Prop({type: String, required: true, default: ' '})
    img: string

    constructor(id: string, name: string, img: string) {
        this._id = id
        this.name = name
        this.img = img
    }
}

@Schema({collection: 'ingredients', versionKey: false})
export class Ingredient {
    @Prop({type: String, required: true})
    _id: string

    @Prop({type: String, required: true})
    name: string

    @Prop({ type: () => [DetailedIngredient], required: true })
    detailedIngredient: DetailedIngredient[]

    constructor(id: string, name: string, detailedIngredient: DetailedIngredient[]) {
        this._id = id
        this.name = name
        this.detailedIngredient = detailedIngredient
    }
}

export type IngredientDocument = HydratedDocument<Ingredient>
export const IngredientSchema = SchemaFactory.createForClass(Ingredient)