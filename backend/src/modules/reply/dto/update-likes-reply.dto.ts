import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, Min} from "class-validator";

export class UpdateLikesReplyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    user: string
}