import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class IngredientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '재료 id'})
    _id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '재료 이름'})
    name: string
}