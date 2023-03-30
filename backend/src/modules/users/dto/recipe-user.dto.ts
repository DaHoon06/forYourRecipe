import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RecipeUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'Google UID', required: false})
    id?: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '사용자 이름', required: true})
    name: string

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '사용자 소개', required: false})
    introduce?: string

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '사용자 이미지', required: false})
    img?: string
}