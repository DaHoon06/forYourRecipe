import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Reply, ReplyDocument} from "@modules/reply/entities/reply.entity";
import {Model} from "mongoose";

@Injectable()
export class ReplyRepository {
    constructor(@InjectModel(Reply.name) private readonly replyModel: Model<ReplyDocument>) {}

    public async findAllByRecipe(recipe: string) {
        return this.replyModel.find({recipe})
    }

    public async findAllByUser(_id: string, user: string) {
        return this.replyModel.findOne({ _id, user })
    }

    public findById(_id: string) {
        return this.replyModel.findById(_id)
    }

    public async save(reply: Reply) {
        return new this.replyModel(reply).save()
    }

    public async update(_id: string, content: string) {
        return this.replyModel.updateOne({_id},{$set: {content}})
    }

    public async updateLikes(_id: string, likes: string[]) {
        return this.replyModel.updateOne({_id},{$set: {likes}})
    }
}