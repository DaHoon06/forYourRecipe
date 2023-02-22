import {
    ArrayNotEmpty,
    IsArray, IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested
} from "class-validator";
import {Type} from "class-transformer";
import {IngredientCategory} from "../../enums/ingredientCategory";
import {ApiProperty} from "@nestjs/swagger";

class AllIngredientInfoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        required: true,
        description: "재료 이름"
    })
    name: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        required: false,
        description: "재료 양"
    })
    unit?: string
}

export class AllIngredientDto {
    @IsEnum(IngredientCategory)
    @IsNotEmpty()
    @ApiProperty({
        enum: IngredientCategory,
        required: true,
        description: "재료 카테고리"
    })
    category: IngredientCategory

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => AllIngredientInfoDto)
    @ApiProperty({
        type: AllIngredientInfoDto,
        isArray: true,
        required: true,
        description: "전체 재료 정보",
    })
    ingredients: AllIngredientInfoDto[]
}
