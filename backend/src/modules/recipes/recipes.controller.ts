import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// import {RecipesService} from "./recipes.service";

@Controller('recipes')
@ApiTags('레시피 관련 API')
export class RecipesController {
  // constructor(private recipesService: RecipesService) {}

  /**
   * 전체 레시피 반환
   * 이외의 여러 스웨거 데코레이터가 있으므로,
   * 같은 방법으로 정의해서 사용
   * @private
   */
  @Get('/all-recipes')
  @ApiOperation({
    summary: '레시피 조회 API Test',
    description: 'DB에 저장된 레시피를 조회한다.',
  })
  @ApiCreatedResponse({
    description: '응답해줄 레시피 종류',
    type: '레시피 DTO를 넣으면 응답값으로 자동으로 넣어짐',
  })
  private getAllRecipes(): void {
    console.log('test');
  }
}
