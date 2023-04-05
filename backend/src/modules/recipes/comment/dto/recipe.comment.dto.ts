import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '레시피 id' })
  recipeId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '작성자 id' })
  user: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '댓글 정보' })
  comment: string;
}
