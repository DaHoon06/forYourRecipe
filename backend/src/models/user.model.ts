import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

@Schema({collection: 'users', versionKey: false})
export class User {

    @Prop({type: String, required: true})
    _id: string

    @Prop({type: String, required: true})
    name: string

    @Prop({type: String, requre: true})
    email: string

    @Prop({type: Date, required: true})
    createdAt: Date

    @Prop({type: Date, required: true})
    updatedAt: Date

    @Prop({type: Array, required: true, default: []})
    favoriteRecipes: string[]

    @Prop({type: Array, required: true, default: []})
    myRecipes: string[]

    @Prop({type: String, required: true, default: ' '})
    img: string
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)