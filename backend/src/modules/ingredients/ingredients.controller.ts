import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiBody, ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {IngredientsService} from "./ingredients.service";
import {RegisteredIngredientDto} from "../../dtos/registered-ingredient.dto";
import {IngredientDto} from "../../dtos/ingredient.dto";

@Controller('ingredients')
@ApiTags('재료 관련 API')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}
    
    @Get('/all-ingredients')
    @ApiOperation({summary: '전체 재료 조회 API', description: '전체 재료를 조회한다.'})
    @ApiCreatedResponse({description: '전체 재료 리스트를 생성한다.', isArray: true, type: IngredientDto})
    async getAllIngredients() :Promise<IngredientDto[]>{
        return this.ingredientsService.findAllIngredient()
    }

    @Post('/registered-ingredient')
    @ApiOperation({summary: '재료 등록 조회 API', description: '재료를 등록한다.'})
    @ApiCreatedResponse({description: '재료 등록 후 성공 여부 boolean을 반환한다.', type: Boolean})
    @ApiBody({type: RegisteredIngredientDto, description: '등록할 재료 이름'})
    async registeredIngredient(@Body() ingredientDto: RegisteredIngredientDto) :Promise<boolean> {
        const { name } = ingredientDto
        return this.ingredientsService.setIngredient(name)
    }
}
