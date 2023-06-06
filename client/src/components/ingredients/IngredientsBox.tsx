import { ReactElement, useState } from 'react'
import classNames from 'classnames'
import styles from './IngredientsBox.module.scss'
import { Typography } from '@components/common/typography/Typography'
import { useIngredients } from '@libs/react-query/hooks/ingredients/useIngredients'
import { Modal } from '@components/common/modal/Modal'
import { SelectedIngredients } from '@components/ingredients/SelectedIngredients'
import { Button } from '@components/common/button/Button'

export const IngredientsBox = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const ingredients = useIngredients()

  const onClickIngredientsBox = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={classNames(styles.ingredients)}>
      <div className={classNames(styles.ingredients_container)}>
        <section className={classNames(styles.ingredients_description)}>
          <Typography>재료를 선택해 주세요.</Typography>
          <div>
            {ingredients.map((ingredient) => {
              return <span key={ingredient._id}>{ingredient.name}</span>
            })}
          </div>
        </section>
        <section>
          <Button onClick={onClickIngredientsBox} variant={'primary'}>
            <Typography variant={'body1'} color={'white'}>
              재료 고르기
            </Typography>
          </Button>
        </section>
      </div>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <SelectedIngredients ingredients={ingredients} />
      </Modal>
    </div>
  )
}
