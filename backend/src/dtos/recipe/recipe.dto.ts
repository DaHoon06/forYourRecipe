import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {DetailedIngredientDto} from "../ingredient/detailed-ingredient.dto";
import {Type} from "class-transformer";
import {StepsDto} from "./steps.dto";
import {AllIngredientDto} from "../ingredient/all-ingredient.dto";

export class RecipeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '레시피 id'})
    _id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '레시피 이름'})
    name: string

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({type: Date, description: '레시피 생성일'})
    createdAt: Date

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({type: Date, description: '레시피 최근수정일'})
    updatedAt: Date

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: '레시피 작성자 id'})
    user: string

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: '재료로 검색 가능 여부'})
    modified: boolean
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number, description: '레시피 좋아요 수'})
    likes: number

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => StepsDto)
    @ApiProperty({
        isArray: true,
        type: StepsDto,
        required: true,
        description:'레시피 순서'
    })
    steps: StepsDto[]

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => AllIngredientDto)
    @ApiProperty({
        isArray: true,
        type: AllIngredientDto,
        required: true,
        description: '레시피 전체재료'
    })
    readonly allIngredient: AllIngredientDto[]

    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => DetailedIngredientDto)
    @ApiProperty({
        isArray: true,
        type: DetailedIngredientDto,
        required: false,
        description: '필수 재료'
    })
    detailedIngredient?: DetailedIngredientDto[]

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        description: '레시피 사진',
        required: false
    })
    profileImage?: string

    constructor (
                id: string, name: string,
                createdAt: Date, updatedAt: Date,
                user: string, modified: boolean,
                likes: number, steps: StepsDto[],
                allIngredient: AllIngredientDto[],
                detailedIngredient?: DetailedIngredientDto[],
                profileImage?: string
                 ) {
        this._id = id
        this.name = name
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.user = user
        this.modified = modified
        this.likes = likes
        this.steps = steps
        this.allIngredient = allIngredient
        this.detailedIngredient = detailedIngredient ? detailedIngredient : []
        this.profileImage = profileImage ? profileImage : ''
    }
}
