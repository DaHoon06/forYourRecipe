import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateReplyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    user: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    content: string
}