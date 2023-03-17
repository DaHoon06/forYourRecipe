import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { StepsDto } from './steps.dto';
import { AllIngredientDto } from '../../ingredients/dto/all-ingredient.dto';

export class RegisteredUserRecipeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '레시피 이름' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '레시피 설명' })
  readonly desc: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => AllIngredientDto)
  @ApiProperty({
    isArray: true,
    type: AllIngredientDto,
    required: true,
    description: '레시피 전체재료',
  })
  readonly allIngredient: AllIngredientDto[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StepsDto)
  @ApiProperty({
    isArray: true,
    type: StepsDto,
    required: true,
    description: '레시피 순서',
  })
  readonly steps: StepsDto[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '작성자 id' })
  readonly user: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: '레시피 사진', required: false })
  readonly profileImage?: string;
}
