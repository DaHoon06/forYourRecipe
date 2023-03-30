import {IsArray, IsDate, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
    @IsString()
    _id: string;

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

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({type: Date, description: '사용자 가입일'})
    createdAt: Date

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({type: Date, description: '사용자정보 최근수정일'})
    updatedAt: Date

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: '사용자 이미지'})
    img: String

    @IsArray()
    @IsString({each: true})
    @IsOptional()
    @ApiProperty({type: String, description: '사용자 즐겨찾는 레시피'})
    favoriteRecipes: string[]

    @IsArray()
    @IsString({each: true})
    @IsOptional()
    @ApiProperty({type: String, description: '사용자가 작성한 레시피'})
    myRecipes: string[]
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '사용자 소개'})
    introduce: string

    constructor(
      id: string, name: string, email: string,
      createdAt: Date, updatedAt: Date,
      img: string, favoriteRecipes: string[],
      myRecipes: string[], introduce: string
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.img = img
        this.favoriteRecipes = favoriteRecipes
        this.myRecipes = myRecipes
        this.introduce = introduce
    }
}