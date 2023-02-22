import {IsBoolean, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DeletedRecipeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '삭제하는 레시피 id'
    })
    id: string

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        type: Boolean,
        description: '게시 true / 삭제 false'
    })
    deleted: boolean
}