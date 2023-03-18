import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegisteredAdminRecipeDto } from '@modules/recipes/dto/registered-admin-recipe.dto';

export class UpdatedAdminRecipeDto extends RegisteredAdminRecipeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '수정하는 레시피 id' })
  readonly id: string;
}
