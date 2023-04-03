export namespace Recipe {
  interface User {
    id: string;
    img: string;
    introduce: string;
    name: string;
  }

  export interface RecipeDetail extends Info {
    user: User;
  }

  export interface Info {
    _id: string;
    name: string;
    allIngredient: AllIngredient[];
    detailedIngredient: IngredientType[];
    profileImage: string;
    createdAt: Date;
    updatedAt: Date;
    modified: boolean;
    steps: Steps[];
    desc: string;
    likes: string[];
  }

  export interface AllIngredient {
    category: string;
    ingredients: {
      name: string;
      unit: string;
    }[];
  }

  export interface IngredientType {
    _id: string;
    name: string;
    img: string;
    selected?: boolean;
  }

  export interface IngredientCategories {
    _id: string;
    name: string;
    detailedIngredient: IngredientType[];
  }

  interface Steps {
    _id: string;
    step: number;
    desc: string;
  }
}
