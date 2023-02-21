import {ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {DetailedIngredientDto} from "./detailed-ingredient.dto";

export class IngredientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '재료의 대분류 id'})
    readonly _id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '재료의 대분류 이름'})
    readonly name: string

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => DetailedIngredientDto )
    @ApiProperty({
        isArray: true,
        type: DetailedIngredientDto,
        description:' 세부 재료 리스트'
    })
    readonly detailedIngredient: DetailedIngredientDto[]
}
