import { IRecipe } from '@interfaces/IRecipe'
import { axiosInstance } from '@libs/axios-instance/axios'

export const getRecipeListsAll = async (
  page: number
): Promise<IRecipe.Card[]> => {
  const { data } = await axiosInstance.get('/recipes/all-recipes', {
    params: {
      page,
    },
  })
  return data
}

export const getOneRecipe = async (
  recipeId: string
): Promise<IRecipe.RecipeDetail> => {
  const { data } = await axiosInstance.get(`/recipes/detail/${recipeId}`)
  return data
}

export const getRandomRecipe = async (): Promise<IRecipe.Card[]> => {
  const { data } = await axiosInstance.get('/recipes/random-recipes')
  return data
}

export const getOneRecipeByIngredientsId = async (
  ingredientsId: string[],
  page: number
): Promise<IRecipe.Card[]> => {
  const { data } = await axiosInstance.get('/recipes/ingredient-recipes', {
    params: { id: ingredientsId, page },
  })
  return data
}

export const searchRecipe = async (
  keyword: string,
  page: number
): Promise<IRecipe.Card[]> => {
  const { data } = await axiosInstance.get('/recipes/search', {
    params: { keyword, page },
  })
  return data
}

export const recipeRegistration = async (
  body: IRecipe.RecipeRegistration
): Promise<boolean> => {
  const { data } = await axiosInstance.post('/recipes/register-recipes', body)
  return data
}

export const deleteOneRecipeByRecipeId = async (
  recipeId: string
): Promise<boolean> => {
  const { data } = await axiosInstance.delete(
    `/recipes/register-recipe/${recipeId}`
  )
  return data
}

export const recipeBookmark = async (body: {
  id: string
  user: string
}): Promise<boolean> => {
  const { data } = await axiosInstance.patch(`/recipes/update-likes`, body)
  return data
}

export const getBookmarkRecipe = async (
  uid: string,
  page: number
): Promise<IRecipe.Card[]> => {
  const { data } = await axiosInstance.get(`/recipes/favorites/${uid}`, {
    params: { page },
  })
  return data
}
