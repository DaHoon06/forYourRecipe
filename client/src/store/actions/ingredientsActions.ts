import {
  IngredientsAction,
  SELECTED_INGREDIENTS,
} from '@store/actions/types/ingredientsTypes'

type InitialStateType = {
  selectedIngredients: string[]
}

const initialState: InitialStateType = {
  selectedIngredients: [],
}

export const ingredientsReducer = (
  state = initialState,
  action: IngredientsAction
) => {
  switch (action.type) {
    case SELECTED_INGREDIENTS:
      return {
        ...state,
        selectedIngredients: action.value,
      }
    default:
      return state
  }
}
