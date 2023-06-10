import { ReactElement, useState } from 'react'
import classNames from 'classnames'
import './IngredientsBox.scss'
import { Typography } from '@components/common/typography/Typography'
import { useIngredients } from '@libs/react-query/hooks/ingredients/useIngredients'
import { Image } from '@components/common/image/Image'
import { Button } from '@components/common/button/Button'

export const IngredientsBox = (): ReactElement => {
  const [currentTab, setCurrentTab] = useState(0)
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([])
  const ingredients = useIngredients()

  const onClickIngredientsIcon = (ingredientId: string): void => {
    //TODO: 1. 클릭했을 때 useState에 값이 존재한다면 거기 값을 사용
    const findIngredient = selectedIngredients.find(
      (value) => value._id === ingredientId
    )
    if (findIngredient) {
      findIngredient.selected = !findIngredient.selected
      console.log(findIngredient)
      setSelectedIngredients([...selectedIngredients, ...findIngredient])
      return
    } else {
      //TODO: 2. useState에 값이 존재하지 않는다면 전체 아이템리스트에서 초기값을 넣어줌
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
      setSelectedIngredients([...selectedIngredients, ...selectedItem])
    }
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
                            color={'white'}
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
          <div>
            {selectedIngredients &&
              selectedIngredients.map((icon) => {
                return <span key={icon._id}>{icon.name}</span>
              })}
          </div>
          <Button>
            <Typography>레시피 검색</Typography>
          </Button>
        </section>
      </div>
    </div>
  )
}
