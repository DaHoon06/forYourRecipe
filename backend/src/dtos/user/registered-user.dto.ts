import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisteredUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'Google UID'})
    id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '사용자 이름'})
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '사용자 email'})
    email: string
}