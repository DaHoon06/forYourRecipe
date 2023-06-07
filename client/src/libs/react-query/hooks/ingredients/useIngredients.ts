import { useQuery } from 'react-query'
import { ingredientKeys } from '@libs/react-query/keys/Ingredient'
import { getIngredients } from '@apis/api/ingredients'
import { useEffect } from 'react'
import { queryClient } from '@libs/react-query/queryClient'

export function useIngredients() {
  useEffect(() => {
    queryClient.prefetchQuery(ingredientKeys.getIngredients, getIngredients)
  }, [])

  const { data = [] } = useQuery(
    [ingredientKeys.getIngredients],
    getIngredients
  )
  return data
}
