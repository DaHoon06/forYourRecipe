import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

@Schema({collection: 'ingredients', versionKey: false})
export class Ingredient {
    @Prop({type: String, required: true})
    _id: string

    @Prop({type: String, required: true})
    name: string

    @Prop({
        type: [{
            _id: {type: String, required: true},
            name: {type: String, required: true},
            img: {type: String, required: true, default: ' '},
        }],
        required: true
    })
    detailedIngredient: {
        _id: string,
        name: string,
        img: string
    }[]
}

export type IngredientDocument = HydratedDocument<Ingredient>
export const IngredientSchema = SchemaFactory.createForClass(Ingredient)