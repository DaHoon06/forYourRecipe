import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

@Schema({collection: 'users', versionKey: false})
export class User {

    @Prop({type: String, required: true})
    _id: string

    @Prop({type: String, required: true})
    name: string

    @Prop({type: String, required: true})
    email: string

    @Prop({type: Date, required: true, default: new Date()})
    createdAt: Date

    @Prop({type: Date, required: true, default: new Date()})
    updatedAt: Date

    @Prop({type: Array, required: true, default: []})
    favoriteRecipes: string[]

    @Prop({type: Array, required: true, default: []})
    myRecipes: string[]

    @Prop({type: String, required: true, default: 'https://4u-recipe.s3.ap-northeast-2.amazonaws.com/profile/profile.svg'})
    img: string

    constructor (id: string, name: string, email: string) {
        this._id = id
        this.name = name
        this.email = email
    }
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)