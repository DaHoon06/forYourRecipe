import { combineReducers } from 'redux'
import { utilReducer } from '@store/actions/utilActions'
import { ingredientsReducer } from '@store/actions/ingredientsActions'

const rootReducer = combineReducers({
  utilReducer,
  ingredientsReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
