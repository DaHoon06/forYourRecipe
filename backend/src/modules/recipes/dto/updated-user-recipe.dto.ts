import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegisteredUserRecipeDto } from '@modules/recipes/dto/registered-user-recipe.dto';

export class UpdatedUserRecipeDto extends RegisteredUserRecipeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '수정하는 레시피 id' })
  readonly id: string;
}
