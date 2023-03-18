import { Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Ingredient,
  IngredientDocument,
} from '@modules/ingredients/entities/ingredient.entity';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IngredientDto } from '@modules/ingredients/dto/ingredient.dto';
import { RegisteredIngredientDto } from '@modules/ingredients/dto/registered-ingredient.dto';
import { GlobalFilter } from '@src/lib/global.filter';

@UseFilters(new GlobalFilter())
@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  //재료 등록
  async setIngredient(ingredientDto: RegisteredIngredientDto) {
    const { name, detailedIngredient } = ingredientDto;
    const ingredients = detailedIngredient.map(({ name, img }) => {
      return {
        _id: uuidv4(),
        name,
        img: img ? img : '',
      };
    });
    const ingredient = {
      _id: uuidv4(),
      name,
      detailedIngredient: ingredients,
    };
    const registeredIngredient = await new this.ingredientModel(
      ingredient,
    ).save();
    if (registeredIngredient) return true;
    return false;
  }

  //모든 재료 반환
  async findAllIngredient(): Promise<IngredientDto[]> {
    return this.ingredientModel.find();
  }

  async findIngredientById(id: string[]) {
    const foundIngredients = await this.ingredientModel.find({
      detailedIngredient: { $elemMatch: { _id: { $in: id } } },
    });
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
      const ingredients = detailedIngredient.map(({ name, img }) => {
        return {
          _id: uuidv4(),
          name,
          img: img ? img : '',
        };
      });
      const ingredient = {
        _id: uuidv4(),
        name,
        detailedIngredient: ingredients,
      };
      const registeredIngredient = new this.ingredientModel(ingredient).save();
      if (!registeredIngredient) return false;
    });
    return true;
  }
}
