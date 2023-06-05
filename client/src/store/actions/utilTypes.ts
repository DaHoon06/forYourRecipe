export const CURRENT_TAB = 'CURRENT_TAB' as const

export const changeNavigation = (tab: number) => {
  return {
    type: CURRENT_TAB,
    value: tab,
  }
}

export type UtilAction = ReturnType<typeof changeNavigation>
