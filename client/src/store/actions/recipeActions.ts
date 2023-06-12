import { IRecipe } from '@interfaces/IRecipe'
import { RecipeAction } from '@store/actions/types/recipeTypes'

type InitialStateType = {
  recipeLists: IRecipe.Card[]
}

const initialState: InitialStateType = {
  recipeLists: [],
}

export const recipeReducer = (state = initialState, action: RecipeAction) => {
  switch (action.type) {
    case 'UPDATE_LISTS':
      return {
        ...state,
        recipeLists: action.value,
      }
    default:
      return state
  }
}
