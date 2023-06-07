import { IRecipe } from '@interfaces/IRecipe'
import { useQuery } from 'react-query'
import { recipeKeys } from '@libs/react-query/keys/Recipe'
import { useEffect } from 'react'
import {
  getOneRecipe,
  getRandomRecipe,
  getRecipeListsAll,
} from '@apis/api/recipe'
import { queryClient } from '@libs/react-query/queryClient'

const initializeState = {
  getRecipe: {
    _id: '',
    name: '',
    profileImage: '',
    desc: '',
    allIngredient: [],
    detailedIngredient: [],
    likes: [],
    createdAt: new Date(),
    steps: [],
    user: { name: '', img: '', id: '', introduce: '' },
    modified: false,
    updatedAt: new Date(),
  },
}

export function useRandomRecipe(page: number): IRecipe.Card[] {
  useEffect(() => {
    queryClient.prefetchQuery(recipeKeys.getRandomRecipe, getRandomRecipe)
  }, [page])

  const { data = [] } = useQuery(
    [recipeKeys.getRandomRecipe, page],
    getRandomRecipe,
    {
      refetchOnMount: true,
      cacheTime: Infinity,
    }
  )
  return data
}

export function useOneRecipe(recipeId: string): IRecipe.RecipeDetail {
  const { data = initializeState.getRecipe } = useQuery(
    [recipeKeys.readRecipe, recipeId],
    () => getOneRecipe(recipeId)
  )
  return data
}

export function useRecipeLists(page: number): IRecipe.Card[] {
  useEffect(() => {
    queryClient.prefetchQuery(recipeKeys.getAllRecipe, () =>
      getRecipeListsAll(page)
    )
  }, [page])

  const { data = [] } = useQuery([recipeKeys.getAllRecipe, page], () =>
    getRecipeListsAll(page)
  )
  return data
}
