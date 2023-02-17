import {ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {DetailedIngredientDto} from "./detailed-ingredient.dto";


export class RegisteredAdminRecipeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '관리자가 등록할 레시피 이름'})
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '관리자가 등록할 레시피 설명'})
    readonly desc: string

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        type: 'array',
        items: {
            type: "object",
            properties: {
                step: {type: "number"},
                desc: {type: "string"},
                img: {type: "string", description: "optional"},
            }
        },
        description: '관리자가 등록할 레시피 순서'
    })
    readonly steps: [
        {
            step: number,
            desc: string,
            img?: string,
        }
    ]

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => DetailedIngredientDto )
    @ApiProperty({
        isArray: true,
        type: DetailedIngredientDto,
        description:'관리자가 등록할 필수 재료 리스트'
    })
    readonly detailedIngredient: DetailedIngredientDto[]

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '관리자가 등록할 레시피 사진', required: false})
    readonly profileImage?: string
}
