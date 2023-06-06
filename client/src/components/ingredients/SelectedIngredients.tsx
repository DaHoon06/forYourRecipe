import { ReactElement } from 'react'
import { IRecipe } from '@interfaces/IRecipe'
import { Image } from '@components/common/image/Image'
import styles from './SelectedIngredients.module.scss'

interface Props {
  ingredients: IRecipe.IngredientCategories[]
}

export const SelectedIngredients = (props: Props): ReactElement => {
  const { ingredients } = props
  return (
    <div className={styles.selected_ingredients_box}>
      {ingredients.map((category) => {
        return (
          <div key={category._id}>
            <p>{category.name}</p>
            {category.detailedIngredient.map((ingredient, index) => {
              return (
                <span key={index}>
                  <Image src={ingredient.img} alt={ingredient.name} />
                  {ingredient.name}
                </span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
