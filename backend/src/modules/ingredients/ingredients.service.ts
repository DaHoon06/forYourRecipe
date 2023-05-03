import { Injectable, UseFilters } from '@nestjs/common';
import {DetailedIngredient, Ingredient} from '@modules/ingredients/entities/ingredient.entity';
import { v4 as uuidv4 } from 'uuid';
import { IngredientDto } from '@modules/ingredients/dto/ingredient.dto';
import { RegisteredIngredientDto } from '@modules/ingredients/dto/registered-ingredient.dto';
import { GlobalFilter } from '@src/lib/global.filter';
import {IngredientsRepository} from "@modules/ingredients/ingredients.repository";

@UseFilters(new GlobalFilter())
@Injectable()
export class IngredientsService {
  constructor(private readonly ingredientsRepository: IngredientsRepository) {}

  //재료 등록
  async setIngredient(ingredientDto: RegisteredIngredientDto) {
    const { name, detailedIngredient } = ingredientDto;
    const ingredients = detailedIngredient.map(({ name, img }) => new DetailedIngredient(uuidv4(), name, img ? img : ''))
    const registeredIngredient = await this.ingredientsRepository.save(new Ingredient(uuidv4(), name, ingredients))
    if (registeredIngredient) return true;
    return false;
  }

  //모든 재료 반환
  async findAllIngredient(): Promise<IngredientDto[]> {
    return this.ingredientsRepository.findAll();
  }

  async findIngredientById(id: string[]) {
    const foundIngredients = await this.ingredientsRepository.findIngredientById(id)
    const detailedIngredients = [];
    foundIngredients
      .map(({ detailedIngredient }: Ingredient) => detailedIngredient)
      .map((ingredients) =>
        ingredients.filter((ingredient) => id.includes(ingredient._id)),
      )
      .forEach((ingredients) =>
        ingredients.forEach((ingredient) => {
          detailedIngredients.push(ingredient);
        }),
      );

    return detailedIngredients;
  }

  //재료 배열로 한번에 업로드 테스트용
  async setIngredients(ingredientDtoArr: RegisteredIngredientDto[]) {
    ingredientDtoArr.forEach((dto) => {
      const { name, detailedIngredient } = dto;
      const ingredients = detailedIngredient.map(({name, img}) => new DetailedIngredient(uuidv4(), name, img ? img : ''))
      const registeredIngredient = this.ingredientsRepository.save(new Ingredient(uuidv4(), name, ingredients))
      if (!registeredIngredient) return false;
    })
    return true
  }
}
