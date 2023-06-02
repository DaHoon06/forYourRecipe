import { axiosInstance } from '@libs/axios'
import { IRecipe } from '@interfaces/IRecipe'
import { Card } from '@components/ui/card/Card'
import { Image } from '@components/common/image/Image'
import './RecipeLists.scss'
import classNames from 'classnames'
import { Typography } from '@components/common/typography/Typography'
import { Tags } from '@components/ui/tag/Tags'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const RecipeLists = () => {
  const [page, setPage] = useState(1)
  const load = async (): Promise<IRecipe.Card[]> => {
    try {
      const { data } = await axiosInstance.get('/recipes/all-recipes', {
        params: { page },
      })
      return data
    } catch (e) {
      throw e
    }
  }

  const { data, isLoading, isError, isIdle } = useQuery<IRecipe.Card[]>(
    'recipes',
    load,
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    }
  )

  if (isLoading || isIdle) return <div>Loading....</div>
  if (isError)
    return (
      <>
        <h1>ERROR!!!!</h1>
      </>
    )

  return (
    <section className={classNames('recipe-list')}>
      {data.map((recipe) => {
        return (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
            <Card>
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
          </Link>
        )
      })}
    </section>
  )
}
