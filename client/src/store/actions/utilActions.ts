import { CURRENT_TAB, UtilAction } from '@store/actions/types/utilTypes'

type InitialStateType = {
  currentTab: number
}

const initialState: InitialStateType = {
  currentTab: 0,
}

export const utilReducer = (state = initialState, action: UtilAction) => {
  switch (action.type) {
    case CURRENT_TAB:
      return {
        ...state,
        currentTab: action.value,
      }
    default:
      return state
  }
}
