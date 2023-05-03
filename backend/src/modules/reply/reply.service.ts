import { Injectable } from '@nestjs/common';
import {ReplyRepository} from "@modules/reply/reply.repository";
import {Reply} from "@modules/reply/entities/reply.entity";
import {ReplyResponseDto} from "@modules/reply/dto/reply-response.dto";

@Injectable()
export class ReplyService {
    constructor(private readonly replyRepository: ReplyRepository) {}

    public async getAllReply(recipeId: string){
        const response: ReplyResponseDto[] = []
        const dataList = await this.replyRepository.findAllByRecipe(recipeId)
        for (const data of dataList) {
            const {_id, content, user, likes } = data
            response.push(new ReplyResponseDto(_id.toString(),  content, user, likes))
        }
        return response
    }

    public async comment(content: string, recipe: string, user: string) {
        const res = this.replyRepository.save(new Reply(content, recipe, user))
        if (res) return true
        return false
    }

    public async updateReply(id: string, content: string, user: string) {
        const validate = await this.replyRepository.findAllByUser(id, user)
        if (!validate) return false
        const { matchedCount } = await this.replyRepository.update(id, content)
        if (matchedCount) return true
        return false
    }

    public async updateReplyLikes(id: string, user: string) {
        const { likes } = await this.replyRepository.findById(id)
        const index = likes.indexOf(user)
        if (index > -1) {
            likes.splice(index, 1)
        } else {
            likes.push(user)
        }
        const { matchedCount, modifiedCount } = await this.replyRepository.updateLikes(id, likes)
        return matchedCount && modifiedCount ? true : false
    }
}
