import {IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RecipeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '레시피 id'})
    readonly _id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '레시피 이름'})
    readonly name: string

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({type: Date, description: '레시피 생성일'})
    readonly createdAt: Date

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({type: Date, description: '레시피 최근수정일'})
    readonly updatedAt: Date

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '레시피 작성자 id'})
    readonly user: string

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: '재료로 검색 가능 여부'})
    readonly modified: boolean

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
        description:'레시피 순서'
    })
    readonly steps: [
        {
            step: number,
            desc: string,
        }
    ]

    @IsArray()
    @IsOptional()
    @ApiProperty({
        type: "array",
        items: {
            type: "string",
        },
        description:'필수 재료 id 리스트'
    })
    readonly ingredients?: string[]
}