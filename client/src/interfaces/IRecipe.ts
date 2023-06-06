export namespace IRecipe {
  interface User {
    id: string
    img: string
    introduce: string
    name: string
  }

  export interface RecipeDetail extends Card {
    user: User
  }

  export interface Card extends Recipe {
    _id: string
    createdAt: Date
    updatedAt: Date
    modified: boolean
    likes: string[]
  }

  export interface RecipeRegistration extends Recipe {
    user: User
  }

  export interface Recipe {
    name: string
    desc: string
    allIngredient: AllIngredient[]
    detailedIngredient: IngredientType[]
    steps: Steps[]
    profileImage: string
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

  export interface IngredientCategories extends Ingredients {
    _id: string
  }

  export interface Ingredients {
    name: string
    detailedIngredient: IngredientType[]
  }
}
