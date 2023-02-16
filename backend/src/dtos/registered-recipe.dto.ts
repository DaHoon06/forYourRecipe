import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisteredRecipeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '회원이 등록할 레시피 이름'})
    readonly name: string

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        type: "array",
        items: {
            type: "object",
            properties: {
                step: {type: "number"},
                desc: {type: "string"},
            }
        },
        description: '회원이 등록할 재료 순서'
    })
    steps: [
        {
            step: number,
            desc: string,
            img?: URL,
        }
    ]

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '등록하는 회원 id'})
    readonly user: string

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '회원이 등록할 레시피 사진'})
    readonly profileImage?: string
}
