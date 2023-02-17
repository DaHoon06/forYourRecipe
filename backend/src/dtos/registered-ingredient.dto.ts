import {IsArray, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

import {RegisteredDetailedIngredientDto} from "./registered-detailed-ingredient.dto";

export class RegisteredIngredientDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: '등록할 재료의 대분류 이름'})
    name: string

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({isArray: true, type: RegisteredDetailedIngredientDto, description: '등록할 재료'})
    readonly detailedIngredient: RegisteredDetailedIngredientDto[]
}