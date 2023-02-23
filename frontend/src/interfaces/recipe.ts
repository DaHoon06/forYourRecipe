export namespace Recipe {
  export interface Info {
    _id: string;
    name: string;
    detailedIngredient: IngredientType[];
    profileImage: string;
    createdAt: Date;
    updatedAt: Date;
    modified: boolean;
    user: string;
    steps: Steps[];
    desc: string;
    likes: string[];
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
