import { ReactElement, useState } from 'react'
import classNames from 'classnames'
import './IngredientsBox.scss'
import { Typography } from '@components/common/typography/Typography'
import { useIngredients } from '@libs/react-query/hooks/ingredients/useIngredients'
import { Image } from '@components/common/image/Image'
import { Button } from '@components/common/button/Button'
import { getRecipeByIngredientIds } from '@apis/api/recipe'
import { useDispatch } from 'react-redux'
import { UPDATE_LISTS } from '@store/actions/types/recipeTypes'

export const IngredientsBox = (): ReactElement => {
  const [currentTab, setCurrentTab] = useState(0)
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([])
  const ingredients = useIngredients()
  const dispatch = useDispatch()

  /*
  TODO: 리팩토링
   컴포넌트 구분
  * */
  /**
   * @description 이 함수의 역할은??????????
   * 1. selectedIngredients 배열 내에 선택한 재료 id 가 있는지 확인
   * 2. 있다면
   * @param ingredientId
   */
  const onClickIngredientsIcon = (ingredientId: string): void => {
    const findIngredient = selectedIngredients.find(
      (value) => value._id === ingredientId
    )

    if (findIngredient) {
      findIngredient.selected = !findIngredient.selected
      if (!findIngredient.selected) {
        setSelectedIngredients(
          selectedIngredients.filter((value) => value._id !== ingredientId)
        )
      } else {
        const copy = Object.assign(selectedIngredients, findIngredient)
        setSelectedIngredients([...copy])
      }
    } else {
      const selectedItem = ingredients
        .map((ingredient) => {
          const initialIngredient = ingredient.detailedIngredient.find(
            (value) => value._id === ingredientId
          )
          if (initialIngredient) {
            return {
              ...initialIngredient,
              selected: true,
            }
          }
        })
        .filter((value) => value)
      if (selectedItem)
        setSelectedIngredients([...selectedIngredients, ...selectedItem])
    }
  }

  const findRecipeByIngredientId = async (): Promise<void> => {
    const ingredientsIds = selectedIngredients.map(
      (ingredient) => ingredient._id
    )
    const data = await getRecipeByIngredientIds(ingredientsIds, 1)
    dispatch({
      type: UPDATE_LISTS,
      value: data,
    })
  }

  return (
    <div className={classNames('ingredients')}>
      <div className={classNames('ingredients_container')}>
        <section className={'selected_ingredients_category'}>
          {ingredients.map((category, index) => {
            return (
              <div className={'category_item'} key={category._id}>
                <section
                  className={classNames(
                    'category_item_title',
                    currentTab === index && 'selected'
                  )}
                >
                  <Button variant={'icon'} onClick={() => setCurrentTab(index)}>
                    <Typography color={'gray'} variant={'body1'}>
                      {category.name}
                    </Typography>
                  </Button>
                </section>
                <section
                  className={classNames(
                    'category_item_icon',
                    currentTab === index && 'show'
                  )}
                >
                  {/*TODO: 같은 코드*/}
                  <div className={classNames('flex')}>
                    {category.detailedIngredient.map((ingredient, index) => {
                      return (
                        <Button
                          onClick={() => onClickIngredientsIcon(ingredient._id)}
                          variant={'icon'}
                          className={classNames(
                            'ingredient_icon',
                            ingredient.selected ? 'active' : ''
                          )}
                          key={index}
                        >
                          <Image
                            src={ingredient.img}
                            alt={ingredient.name}
                            width={24}
                          />
                          <Typography
                            color={'gray'}
                            variant={'body2'}
                            as={'span'}
                          >
                            {ingredient.name}
                          </Typography>
                        </Button>
                      )
                    })}
                  </div>
                </section>
              </div>
            )
          })}
        </section>
        <section>
          <Typography variant={'body1'}>선택한 재료</Typography>
          {/*TODO: 같은 코드*/}
          <div className={classNames('flex')}>
            {selectedIngredients &&
              selectedIngredients.map((ingredient, index) => {
                return (
                  <Button
                    onClick={() => onClickIngredientsIcon(ingredient._id)}
                    variant={'icon'}
                    className={classNames(
                      'ingredient_icon',
                      ingredient.selected ? 'active' : ''
                    )}
                    key={index}
                  >
                    <Image
                      src={ingredient.img}
                      alt={ingredient.name}
                      width={24}
                    />
                    <Typography color={'gray'} variant={'body2'} as={'span'}>
                      {ingredient.name}
                    </Typography>
                  </Button>
                )
              })}
          </div>
          <Button variant={'primary'} onClick={findRecipeByIngredientId}>
            <Typography variant={'body2'} weight={'medium'} color={'white'}>
              레시피 검색
            </Typography>
          </Button>
        </section>
      </div>
    </div>
  )
}
