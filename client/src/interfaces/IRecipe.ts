export namespace IRecipe {
  interface User {
    id: string;
    img: string;
    introduce: string;
    name: string;
  }

  export interface RecipeDetail extends Card {
    user: User
  }

  export interface Card {
    _id: string
    name: string
    allIngredient: AllIngredient[]
    detailedIngredient: IngredientType[]
    profileImage: string
    createdAt: Date
    updatedAt: Date
    modified: boolean
    steps: Steps[]
    desc: string
    likes: string[]
  }


  export interface AllIngredient {
    category: string
    ingredients: {
      name: string
      unit: string
    }[]
  }

  export interface IngredientType {
    _id: string
    name: string
    img: string
    selected?: boolean
  }

  interface Steps {
    _id: string
    step: number
    desc: string
  }

  export interface IngredientCategories {
    _id: string
    name: string
    detailedIngredient: IngredientType[]
  }
}
