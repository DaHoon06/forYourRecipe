import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

@Schema({collection: 'ingredients', versionKey: false})
export class Ingredient {
    @Prop({type: String, required: true})
    _id: String

    @Prop({type: String, required: true})
    name: String

    // @Prop({type: URL, required: false})
    // img?: URL
}

export type IngredientDocument = HydratedDocument<Ingredient>
export const IngredientSchema = SchemaFactory.createForClass(Ingredient)