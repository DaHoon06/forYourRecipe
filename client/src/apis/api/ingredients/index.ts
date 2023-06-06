import { axiosInstance } from '@libs/axios-instance/axios'
import { IRecipe } from '@interfaces/IRecipe'

export const getIngredients = async (): Promise<
  IRecipe.IngredientCategories[]
> => {
  const { data } = await axiosInstance.get('/ingredients/all-ingredients')
  return data
}

export const insertOneIngredients = async (
  body: IRecipe.Ingredients
): Promise<boolean> => {
  const { data } = await axiosInstance.post(
    '/ingredients/registered-ingredient',
    body
  )
  return data
}
