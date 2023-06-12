import { Card } from '@components/ui/card/Card'
import { Image } from '@components/common/image/Image'
import './RecipeLists.scss'
import classNames from 'classnames'
import { Typography } from '@components/common/typography/Typography'
import { Tags } from '@components/ui/tag/Tags'
import { Link } from 'react-router-dom'
import { ReactElement, useEffect, useState } from 'react'
import { useRecipeLists } from '@libs/react-query/hooks/recipes/useRecipe'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_LISTS } from '@store/actions/types/recipeTypes'
import { RootState } from '@store/reducer/rootReducer'
import { getRecipeListsAll } from '@apis/api/recipe'

export const RecipeLists = (): ReactElement => {
  const [page, setPage] = useState(1)
  const recipe = useRecipeLists(page)
  const dispatch = useDispatch()
  const { recipeLists } = useSelector((state: RootState) => state.recipeReducer)

  useEffect(() => {
    dispatch({
      type: UPDATE_LISTS,
      value: recipe,
    })
  }, [])

  return (
    <section className={classNames('recipe-list')}>
      {recipeLists.length === 0 && (
        <Typography>등록된 레시피가 없습니다.</Typography>
      )}
      {recipeLists.map((recipe) => {
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
                {recipe.detailedIngredient.map((ingredient) => {
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
