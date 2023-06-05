import { IRecipe } from '@interfaces/IRecipe'
import { axiosInstance } from '@libs/axios-instance/axios'

export const getRecipeLists = async (page: number): Promise<IRecipe.Card[]> => {
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