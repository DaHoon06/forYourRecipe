import { axiosInstance } from '@libs/axios'
import { useEffect, useState } from 'react'
import { IRecipe } from '@interfaces/IRecipe'
import { Card } from '@components/ui/card/Card'
import { Image } from '@components/image/Image'
import './RecipeLists.scss'
import classNames from 'classnames'
import { Typography } from '@components/typography/Typography'
import { Tags } from '@components/ui/tag/Tags'

export const RecipeLists = () => {
  const [recipe, setRecipes] = useState<IRecipe.Card[]>([])

  useEffect(() => {
    load()
  }, [])

  const load = async (): Promise<void> => {
    try {
      const { data } = await axiosInstance.get('/recipes/all-recipes')
      console.log(data)
      setRecipes(data)
    } catch (e) {
      throw e
    }
  }

  const recipeDetail = (_id: string): void => {}

  return (
    <div className={classNames('recipe-list')}>
      {recipe.map((recipe, index) => {
        return (
          <Card key={recipe._id} onClick={() => recipeDetail(recipe._id)}>
            <picture className={classNames('recipe__img--wrapper')}>
              <Image
                className={classNames('recipe__img')}
                src={recipe.profileImage}
                alt={recipe.name}
              />
            </picture>
            <Typography className={'text-center'} variant={'body2'}>
              {recipe.name}
            </Typography>
            <div className={classNames('flex')}>
              {recipe.detailedIngredient.map((ingredient, index) => {
                return <Tags key={ingredient._id} tags={ingredient.name} />
              })}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
