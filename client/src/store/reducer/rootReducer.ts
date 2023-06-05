import { combineReducers } from 'redux'
import { utilReducer } from '@store/actions/utilActions'

const rootReducer = combineReducers({
  utilReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
