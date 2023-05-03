import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Reply, ReplySchema} from "@modules/reply/entities/reply.entity";
import {ReplyRepository} from "@modules/reply/reply.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }])],
  controllers: [ReplyController],
  providers: [ReplyService, ReplyRepository]
})
export class ReplyModule {}
