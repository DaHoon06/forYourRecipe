import {ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisteredUserRecipeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '회원이 등록할 레시피 이름'})
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '관리자가 등록할 레시피 설명'})
    readonly desc: string

    @IsArray()
    @ArrayMinSize(1)
    @ApiProperty({
        type: "array",
        items: {
            type: "object",
            properties: {
                step: {type: "number"},
                desc: {type: "string"},
                img: {type: "string", description: "optional"},
            }
        },
        description: '회원이 등록할 재료 순서'
    })
    steps: [
        {
            step: number,
            desc: string,
            img?: string,
        }
    ]

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '등록하는 회원 id'})
    readonly user: string

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '회원이 등록할 레시피 사진', required: false})
    readonly profileImage?: string
}
