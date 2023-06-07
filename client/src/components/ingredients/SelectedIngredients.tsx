import { ReactElement, useCallback, useState } from 'react'
import { IRecipe } from '@interfaces/IRecipe'
import { Image } from '@components/common/image/Image'
import './SelectedIngredients.scss'
import { Typography } from '@components/common/typography/Typography'
import classNames from 'classnames'

interface Props {
  ingredients: IRecipe.IngredientCategories[]
}

export const SelectedIngredients = (props: Props): ReactElement => {
  const [ingredientsArr, setIngredientsArr] = useState([])
  const { ingredients } = props

  //TODO : 선택한 재료에 selected 표시 주기
  const selectedIngredients = useCallback(
    (ingredientsId: string) => {
      ingredients.forEach((value) => {
        const detailedIngredient = value.detailedIngredient.filter(
          (ingredient) => ingredient._id === ingredientsId
        )
        if (detailedIngredient.length > 0)
          detailedIngredient[0].selected = false
        setIngredientsArr({ ...ingredientsArr, ...detailedIngredient[0] })

        if (detailedIngredient.length > 0 && !detailedIngredient[0].selected) {
          detailedIngredient[0].selected = !detailedIngredient[0].selected
        }
      })
    },
    [ingredients]
  )

  return (
    <div className={'selected_ingredients_box'}>
      {ingredients.map((category) => {
        return (
          <div className={'selected_ingredients_container'} key={category._id}>
            <Typography color={'black100'} variant={'h1'}>
              {category.name}
            </Typography>
            <div className={classNames('flex')}>
              {category.detailedIngredient.map((ingredient, index) => {
                return (
                  <span
                    className={classNames(
                      'ingredient_icon',
                      ingredient.selected ? 'active' : ''
                    )}
                    onClick={() => selectedIngredients(ingredient._id)}
                    key={index}
                  >
                    <Image
                      src={ingredient.img}
                      alt={ingredient.name}
                      width={24}
                    />
                    <Typography as={'span'}>{ingredient.name}</Typography>
                  </span>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
