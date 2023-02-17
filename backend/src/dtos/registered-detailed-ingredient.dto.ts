import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisteredDetailedIngredientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '재료의 이름'})
    readonly name: string

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '재료의 사진'})
    readonly img?: string
}

