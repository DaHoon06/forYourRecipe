import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class StepsDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number, description: '요리 순서 번호'})
    readonly step: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '요리 순서 설명'})
    readonly desc: string

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '요리 순서 이미지', required: false})
    readonly img?: string
}