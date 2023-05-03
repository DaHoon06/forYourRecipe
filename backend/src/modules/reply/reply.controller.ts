import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {ReplyService} from "@modules/reply/reply.service";
import {RegReplyDto} from "@modules/reply/dto/reg-reply.dto";
import {UpdateReplyDto} from "@modules/reply/dto/update-reply.dto";
import {UpdateLikesReplyDto} from "@modules/reply/dto/update-likes-reply.dto";
import {ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";

@Controller('reply')
@ApiTags('댓글 관련 API')
export class ReplyController {
    constructor(private readonly replyService: ReplyService) {}

    @ApiOperation({ summary: '해당 레시피 댓글 조회 API' })
    @ApiCreatedResponse({ type: [RegReplyDto]})
    @ApiParam({ name: 'id', type: String })
    @Get('/findAll/:id')
    private async getAllReply(@Param('id') recipeId: string) {
        return this.replyService.getAllReply(recipeId)
    }

    @ApiOperation({ summary: '댓글 등록 API'})
    @ApiCreatedResponse({ type: Boolean})
    @ApiBody({ type: RegReplyDto })
    @Post('/comment')
    private async comment(@Body() regReplyDto: RegReplyDto) {
        const { content, user, recipe } =  regReplyDto
        return this.replyService.comment(content, recipe, user)
    }

    @ApiOperation({ summary: '댓글 수정 API'})
    @ApiCreatedResponse({ type: Boolean})
    @ApiBody({ type: UpdateReplyDto })
    @Patch('/update')
    private async updateReply(@Body() updateReplyDto: UpdateReplyDto) {
        const { id, content, user } = updateReplyDto
        return this.replyService.updateReply(id, content, user)
    }
    
    @ApiOperation({ summary: '댓글 좋아요 API', description: '(등록 -> 미등록, 미등록 -> 등록)'})
    @ApiCreatedResponse({ type: Boolean })
    @ApiBody({ type: UpdateLikesReplyDto })
    @Patch('/update-likes')
    private async updateLikes(@Body() updateLikesReplyDto: UpdateLikesReplyDto) {
        const { id, user } = updateLikesReplyDto
        return this.replyService.updateReplyLikes(id, user)
    }
}
