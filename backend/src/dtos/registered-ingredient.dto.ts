import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisteredIngredientDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: '등록할 재료 이름'})
    name: string
}