import { combineReducers } from 'redux'
import { utilReducer } from '@store/actions/utilActions'
import { ingredientsReducer } from '@store/actions/ingredientsActions'
import { recipeReducer } from '@store/actions/recipeActions'

const rootReducer = combineReducers({
  utilReducer,
  ingredientsReducer,
  recipeReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
