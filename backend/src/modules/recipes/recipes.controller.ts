import {Controller, Get} from '@nestjs/common';
// import {RecipesService} from "./recipes.service";

@Controller('recipes')
export class RecipesController {
    // constructor(private recipesService: RecipesService) {}

    /**
     * 전체 레시피 반환
     * @private
     */
    @Get('/all-recipes')
    private getAllRecipes(): void {
        console.log('test')
    }
}
