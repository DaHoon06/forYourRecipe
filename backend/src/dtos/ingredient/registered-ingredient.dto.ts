import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

class RegisteredDetailedIngredientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '재료의 이름'})
    readonly name: string

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '재료의 사진'})
    readonly img?: string
}

export class RegisteredIngredientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '등록할 재료의 대분류 이름'})
    readonly name: string

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({isArray: true, type: RegisteredDetailedIngredientDto, description: '등록할 재료'})
    readonly detailedIngredient: RegisteredDetailedIngredientDto[]
}