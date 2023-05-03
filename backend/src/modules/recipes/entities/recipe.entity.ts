import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IngredientCategory } from '@src/enums/ingredientCategory';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '@src/enums/role';

class Step {
  @Prop({ type: Number, required: true })
  step: number;
  @Prop({ type: String, required: true })
  desc: string;
  @Prop({ type: String, required: false })
  img?: string;
}

class AllIngredient {
  @Prop({ type: () => IngredientCategory, required: true })
  category: IngredientCategory

  @Prop({ type: () => [{ name: { type: String, required: true }, unit: { type: String, required: false }}], required: true })
  ingredients: {
    name: string;
    unit?: string;
  }[];
}

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

  @Prop({type: () => [Step], required: true })
  steps: Step[];

  //재료 검색 가능한지 레시피인지 체크
  @Prop({ type: Boolean, required: true, default: true })
  modified: boolean;

  @Prop({ type: () => [AllIngredient], required: true })
  allIngredient: AllIngredient[];

  @Prop({ type: Boolean, required: true, default: false })
  deleted: boolean;

  @Prop({ type: [String], required: true, default: [] })
  detailedIngredient: string[];

  @Prop({ type: String, required: true })
  profileImage: string;

  constructor( roll: Role, steps: Step[],
               name: string, desc: string,
               profileImage: string, allIngredient: AllIngredient[],
               user: string, detailedIngredient?: string[]) {
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
