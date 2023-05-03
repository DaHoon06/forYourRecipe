import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class RegReplyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    content: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    recipe: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    user: string
}