import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IngredientsService } from '@modules/ingredients/ingredients.service';
import { RegisteredIngredientDto } from '@modules/ingredients/dto/registered-ingredient.dto';
import { IngredientDto } from '@modules/ingredients/dto/ingredient.dto';
import { GlobalFilter } from '@src/lib/global.filter';

@UseFilters(new GlobalFilter())
@Controller('ingredients')
@ApiTags('재료 관련 API')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get('/all-ingredients')
  @ApiOperation({ summary: '전체 재료 조회 API'})
  @ApiCreatedResponse({type: [IngredientDto]})
  async getAllIngredients(): Promise<IngredientDto[]> {
    return this.ingredientsService.findAllIngredient();
  }

  @Post('/registered-ingredient')
  @ApiOperation({summary: '재료 등록 조회 API'})
  @ApiCreatedResponse({type: Boolean})
  @ApiBody({type: RegisteredIngredientDto})
  async registeredIngredient(
    @Body() ingredientDto: RegisteredIngredientDto,
  ): Promise<boolean> {
    return this.ingredientsService.setIngredient(ingredientDto);
  }

  //재료 배열로 한번에 업로드 테스트용
  @Post('/registered-ingredients')
  async registeredIngredients( @Body() ingredientDtoArr: RegisteredIngredientDto[]) {
    return this.ingredientsService.setIngredients(ingredientDtoArr);
  }
}
