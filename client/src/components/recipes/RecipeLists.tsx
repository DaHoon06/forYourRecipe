import {axiosInstance} from '@libs/axios'
import {useEffect, useState} from 'react'
import {IRecipe} from '@interfaces/IRecipe'
import {Card} from '@components/ui/card/Card'
import {Image} from '@components/image/Image'
import './RecipeLists.scss'
import classNames from 'classnames'
import {Typography} from '@components/typography/Typography'
import {Tags} from '@components/ui/tag/Tags'
import {useQuery, useQueryClient} from 'react-query'
import {Link} from 'react-router-dom'

export const RecipeLists = () => {
  const [recipes, setRecipes] = useState<IRecipe.Card[]>([])
  const queryClient = useQueryClient()

  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    const test = await queryClient.invalidateQueries('recipes')
    console.log(test, '롸')
  }

  const load = async (): Promise<IRecipe.Card[]> => {
    try {
      const {data} = await axiosInstance.get('/recipes/all-recipes')
      return data
    } catch (e) {
      throw e
    }
  }


  const {isLoading, isError} = useQuery('recipes', load, {
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    onSuccess: (data) => {
      setRecipes(data)
    },
  })

  return (
    <section className={classNames('recipe-list')}>
      {recipes.map((recipe, index) => {
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
                  return <Tags key={ingredient._id} tags={ingredient.name}/>
                })}
              </div>
            </Card>
          </Link>
        )
      })}
    </section>
  )
}
