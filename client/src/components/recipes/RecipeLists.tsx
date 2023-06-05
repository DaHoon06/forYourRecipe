import { Card } from '@components/ui/card/Card'
import { Image } from '@components/common/image/Image'
import './RecipeLists.scss'
import classNames from 'classnames'
import { Typography } from '@components/common/typography/Typography'
import { Tags } from '@components/ui/tag/Tags'
import { Link } from 'react-router-dom'
import { ReactElement, useState } from 'react'
import { useRecipeLists } from '@libs/react-query/hooks/recipe/useRecipe'

export const RecipeLists = (): ReactElement => {
  const [page, setPage] = useState(1)
  const recipe = useRecipeLists(page)

  return (
    <section className={classNames('recipe-list')}>
      {recipe.map((recipe) => {
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
