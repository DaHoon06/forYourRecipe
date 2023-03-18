import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IngredientCategory } from '@src/enums/ingredientCategory';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '@src/enums/role';

@Schema({ collection: 'recipes', versionKey: false, _id: false })
export class Recipe {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: String, required: true })
  desc: string;

  @Prop({ type: [String], required: true, default: [] })
  likes: string[];

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, required: true, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: String, required: true })
  user: string;

  @Prop({
    type: [
      {
        step: { type: Number, required: true },
        desc: { type: String, required: true },
        img: { type: String, required: false },
      },
    ],
    required: true,
  })
  steps: {
    step: number;
    desc: string;
    img?: string;
  }[];

  //재료 검색 가능한지 레시피인지 체크
  @Prop({ type: Boolean, required: true, default: true })
  modified: boolean;

  @Prop({
    type: [
      {
        category: { type: String, required: true },
        ingredients: {
          type: [
            {
              name: { type: String, required: true },
              unit: { type: String, required: false },
            },
          ],
        },
      },
    ],
    required: true,
  })
  allIngredient: {
    category: IngredientCategory;
    ingredients: {
      name: string;
      unit?: string;
    }[];
  }[];

  @Prop({ type: Boolean, required: true, default: false })
  deleted: boolean;

  @Prop({ type: [String], required: true, default: [] })
  detailedIngredient: string[];

  @Prop({ type: String, required: true })
  profileImage: string;

  constructor(
    roll: Role,
    steps: { step: number; desc: string; img?: string }[],
    name: string,
    desc: string,
    profileImage: string,
    allIngredient: {
      category: IngredientCategory;
      ingredients: { name: string; unit?: string }[];
    }[],
    user: string,
    detailedIngredient?: string[],
  ) {
    this._id = uuidv4();
    this.steps = steps;
    this.allIngredient = allIngredient;
    this.name = name;
    this.profileImage = profileImage
      ? profileImage
      : 'https://4u-recipe.s3.ap-northeast-2.amazonaws.com/foods/default.jpg';
    this.desc = desc;
    this.user = user;

    switch (roll) {
      case Role.ADMIN: {
        this.detailedIngredient = detailedIngredient;
        break;
      }
      case Role.USER: {
        this.modified = false;
        break;
      }
    }
  }
}

export type RecipeDocument = HydratedDocument<Recipe>;
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
