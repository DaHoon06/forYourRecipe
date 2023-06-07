export const SELECTED_INGREDIENTS = 'SELECTED_INGREDIENTS' as const

export const selectedIngredients = (ingredients: string[]) => {
  return {
    type: SELECTED_INGREDIENTS,
    value: ingredients,
  }
}

export type IngredientsAction = ReturnType<typeof selectedIngredients>
