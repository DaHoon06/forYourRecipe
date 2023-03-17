import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatedRecipeLikeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '즐겨찾기 등록할 레시피 id'})
    readonly id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '즐겨찾기 등록하는 회원 id'})
    readonly user: string
}