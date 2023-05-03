import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

@Schema({collection: 'reply', versionKey: false})
export class Reply {
    @Prop({ type: String, required: true })
    content: string

    @Prop({ type: String, required: true })
    recipe: string

    @Prop({ type: String, required: true })
    user: string

    @Prop({ type: [String], required: true, default: []})
    likes: string[]

    constructor(content: string, recipe: string, user: string) {
        this.content = content
        this.recipe = recipe
        this.user = user
    }
}

export type ReplyDocument = HydratedDocument<Reply>
export const ReplySchema = SchemaFactory.createForClass(Reply)
