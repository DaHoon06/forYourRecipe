import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisteredAdminRecipeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '관리자가 등록할 레시피 이름'})
    readonly name: string

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        type: 'array',
        items: {
            type: "object",
            properties: {
                step: {type: "number"},
                desc: {type: "string"},
            }
        },
        description: '관리자가 등록할 레시피 순서'
    })
    readonly steps: [
        {
            step: number,
            desc: string
        }
    ]

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        type: "array",
        items: {
            type: "string",
        },
        description: '관리자가 등록할 레시피 필수재료'
    })
    readonly ingredients: string[]

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '관리자가 등록할 레시피 사진'})
    readonly profileImage?: string
}
