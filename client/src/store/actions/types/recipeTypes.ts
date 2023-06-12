import { IRecipe } from '@interfaces/IRecipe'

export const UPDATE_LISTS = 'UPDATE_LISTS' as const

export const recipeUpdate = (lists: IRecipe.Card[]) => {
  return {
    type: UPDATE_LISTS,
    value: lists,
  }
}

export type RecipeAction = ReturnType<typeof recipeUpdate>
