import styles from './Card.module.scss'
import classNames from 'classnames'
import { ComponentProps, ReactElement } from 'react'

interface Props extends ComponentProps<'article'> {}

export const Card = (props: Props): ReactElement => {
  const { children } = props
  return (
    <div className={classNames(styles.card)}>
      <div className={classNames(styles.card_body)}>{children}</div>
    </div>
  )
}
