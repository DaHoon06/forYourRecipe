import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

@Schema({collection: 'users', versionKey: false})
export class User {

    @Prop({type: String, required: true})
    _id: String

    @Prop({type: String, required: true})
    name: String

    @Prop({type: Date, required: true})
    createdAt: Date

    @Prop({type: Date, required: true})
    updatedAt: Date

    @Prop({type: Array, required: false})
    favoriteRecipes?: String[]

    @Prop({type: Array, required: false})
    myRecipes?: String[]

    // @Prop({type: String, required: false})
    // img?: String
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)